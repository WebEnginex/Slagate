import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

// Équivalent de __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

/**
 * Configuration - MODIFIEZ CES VARIABLES SELON VOS BESOINS
 * ======================================================
 */

// Pour exécuter ce script, utilisez la commande:
// node convert-to-webp.js

// Dossier source contenant les images PNG
const SOURCE_DIR = path.join(__dirname, 'public', 'images', 'test');

// Dossier de destination pour les images WebP (même que la source par défaut)
const DESTINATION_DIR = path.join(__dirname, 'public', 'images', 'test');

// Qualité de la compression WebP (0-100, 100 étant la meilleure qualité)
const QUALITY = 85;

// Largeur maximale des images (null pour conserver la taille d'origine)
const MAX_WIDTH = null;

// Supprimer les fichiers PNG originaux après conversion réussie (true/false)
const DELETE_ORIGINALS = true;

// Extension à rechercher
const SOURCE_EXTENSION = '.png';

// Extension de sortie
const TARGET_EXTENSION = '.webp';

/**
 * Convertit une image PNG en WebP
 * @param {string} sourcePath - Chemin de l'image source
 * @param {string} destinationPath - Chemin de destination
 * @param {number} quality - Qualité de la compression (0-100)
 * @param {number|null} maxWidth - Largeur maximale (null pour garder la taille originale)
 * @param {boolean} deleteOriginal - Supprimer le fichier original après conversion
 * @returns {Promise<{success: boolean, originalSize: number, newSize: number, reduction: number, deleted: boolean}>}
 */
async function convertToWebP(sourcePath, destinationPath, quality, maxWidth = null, deleteOriginal = false) {
  try {
    const fileName = path.basename(sourcePath);
    console.log(`🔄 Conversion de ${fileName} (qualité: ${quality}%)...`);
    
    // Vérifier que le fichier source existe
    if (!fs.existsSync(sourcePath)) {
      console.error(`❌ Le fichier source n'existe pas: ${sourcePath}`);
      return { success: false, originalSize: 0, newSize: 0, reduction: 0 };
    }
    
    // Obtenir les statistiques d'origine avant la conversion
    const sourceStats = await stat(sourcePath);
    const sourceSizeKB = (sourceStats.size / 1024).toFixed(2);
    
    let sharpInstance = sharp(sourcePath);
    
    // Obtenir les métadonnées de l'image pour information
    const metadata = await sharpInstance.metadata();
    const dimensions = metadata ? `${metadata.width}x${metadata.height}px` : "dimensions inconnues";
    
    // Redimensionner si une largeur maximale est spécifiée
    if (maxWidth && metadata && metadata.width > maxWidth) {
      const aspectRatio = metadata.height / metadata.width;
      const newHeight = Math.round(maxWidth * aspectRatio);
      sharpInstance = sharpInstance.resize({ width: maxWidth, height: newHeight, withoutEnlargement: true });
      console.log(`📐 Redimensionnement: ${metadata.width}x${metadata.height}px → ${maxWidth}x${newHeight}px`);
    }
    
    // Convertir en WebP avec la qualité spécifiée
    await sharpInstance
      .webp({ quality })
      .toFile(destinationPath);
    
    // Vérifier que le fichier de destination a bien été créé
    if (!fs.existsSync(destinationPath)) {
      throw new Error("Le fichier de destination n'a pas été créé");
    }
    
    // Obtenir des statistiques sur les fichiers pour calculer la réduction de taille
    const destStats = await stat(destinationPath);
    
    const sizeBefore = sourceSizeKB;
    const sizeAfter = (destStats.size / 1024).toFixed(2);
    const reduction = (100 - (destStats.size / sourceStats.size * 100)).toFixed(2);
    const byteSaved = sourceStats.size - destStats.size;
    const kbSaved = (byteSaved / 1024).toFixed(2);
    
    console.log(`✅ Conversion terminée: ${fileName} → ${path.basename(destinationPath)}`);
    console.log(`   Dimensions: ${dimensions}`);
    console.log(`   Taille d'origine: ${sizeBefore} Ko`);
    console.log(`   Nouvelle taille:  ${sizeAfter} Ko`);
    console.log(`   Économisé:        ${kbSaved} Ko (${reduction}% de réduction)`);
    
    // Suppression du fichier original si demandé
    let deleted = false;
    if (deleteOriginal) {
      try {
        fs.unlinkSync(sourcePath);
        console.log(`🗑️  Fichier original ${fileName} supprimé`);
        deleted = true;
      } catch (err) {
        console.error(`❌ Erreur lors de la suppression du fichier original ${fileName}:`, err);
      }
    }
    
    return {
      success: true,
      originalSize: sourceStats.size,
      newSize: destStats.size,
      reduction: parseFloat(reduction),
      fileName: fileName,
      dimensions: dimensions,
      deleted: deleted
    };
  } catch (err) {
    console.error(`❌ Erreur lors de la conversion de ${path.basename(sourcePath)}:`, err);
    return { success: false, originalSize: 0, newSize: 0, reduction: 0, fileName: path.basename(sourcePath) };
  }
}

/**
 * Parcourt un dossier et convertit toutes les images PNG en WebP
 * @param {string} sourceDir - Dossier source
 * @param {string} destDir - Dossier de destination
 * @param {number} quality - Qualité de la compression
 * @param {number|null} maxWidth - Largeur maximale
 * @param {boolean} deleteOriginals - Supprimer les fichiers originaux après conversion
 * @returns {Promise<{totalOriginalSize: number, totalNewSize: number, fileCount: number, deletedCount: number}>}
 */
async function convertDirectory(sourceDir, destDir, quality, maxWidth = null, deleteOriginals = false) {
  try {
    // Statistiques globales
    let totalOriginalSize = 0;
    let totalNewSize = 0;
    let fileCount = 0;
    let successCount = 0;
    let deletedCount = 0;
    
    // S'assurer que le dossier de destination existe
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Lire le contenu du dossier
    const files = await readdir(sourceDir);
    
    // Filtrer uniquement les fichiers PNG
    const pngFiles = files.filter(file => file.toLowerCase().endsWith(SOURCE_EXTENSION));
    
    if (pngFiles.length === 0) {
      console.log(`⚠️ Aucun fichier ${SOURCE_EXTENSION} trouvé dans ${sourceDir}`);
      return { totalOriginalSize: 0, totalNewSize: 0, fileCount: 0 };
    }
    
    console.log(`🔍 Trouvé ${pngFiles.length} fichier(s) ${SOURCE_EXTENSION} à convertir`);
    
    // Convertir chaque fichier PNG en WebP
    for (const file of pngFiles) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file.replace(SOURCE_EXTENSION, TARGET_EXTENSION));
      
      try {
        // Obtenir les statistiques avant la conversion
        const sourceStats = await stat(sourcePath);
        // Convertir l'image
        const result = await convertToWebP(sourcePath, destPath, quality, maxWidth, deleteOriginals);
        
        // Vérifier si le fichier de destination existe pour compter les statistiques
        if (fs.existsSync(destPath)) {
          const destStats = await stat(destPath);
          
          // Ajouter aux statistiques globales
          totalOriginalSize += sourceStats.size;
          totalNewSize += destStats.size;
          fileCount++;
          successCount++;
          
          // Incrémenter le compteur de fichiers supprimés si applicable
          if (result.deleted) {
            deletedCount++;
          }
        }
      } catch (err) {
        console.error(`❌ Erreur avec le fichier ${file}:`, err);
      }
    }
    
    // Afficher le résumé de la conversion
    if (successCount > 0) {
      const totalOriginalSizeKB = (totalOriginalSize / 1024).toFixed(2);
      const totalNewSizeKB = (totalNewSize / 1024).toFixed(2);
      const totalSaved = (totalOriginalSize - totalNewSize);
      const totalSavedKB = (totalSaved / 1024).toFixed(2);
      const totalSavedMB = (totalSaved / (1024 * 1024)).toFixed(2);
      const averageReduction = (100 - (totalNewSize / totalOriginalSize * 100)).toFixed(2);
      
      console.log('\n✨ Conversion terminée avec succès!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📊 RÉSUMÉ GLOBAL DE LA CONVERSION`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📁 Nombre de fichiers traités avec succès: ${successCount} / ${pngFiles.length}`);
      if (deleteOriginals) {
        console.log(`🗑️  Fichiers originaux supprimés:          ${deletedCount} / ${successCount}`);
      }
      console.log(`📦 Taille originale totale:               ${totalOriginalSizeKB.padStart(10)} Ko`);
      console.log(`📦 Nouvelle taille totale:                ${totalNewSizeKB.padStart(10)} Ko`);
      console.log(`💾 ESPACE DISQUE ÉCONOMISÉ:               ${totalSavedKB.padStart(10)} Ko (${totalSavedMB} Mo)`);
      console.log(`📉 Taux de compression moyen:             ${averageReduction.padStart(10)}%`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      // Calcul des statistiques additionnelles
      const totalOriginalSizeMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
      const totalNewSizeMB = (totalNewSize / (1024 * 1024)).toFixed(2);
      
      // Si la taille est significative, afficher aussi en Mo
      if (parseFloat(totalOriginalSizeMB) >= 1 || parseFloat(totalNewSizeMB) >= 1) {
        console.log(`\nℹ️  En mégaoctets:`);
        console.log(`   Taille originale: ${totalOriginalSizeMB} Mo`);
        console.log(`   Nouvelle taille:  ${totalNewSizeMB} Mo`);
        
        // Projection d'économie sur 1000 images similaires
        const projectedSaving = (totalSaved * 1000 / (1024 * 1024)).toFixed(2);
        console.log(`\n💡 Si vous convertissiez 1000 images similaires, vous économiseriez environ ${projectedSaving} Mo d'espace disque.`);
      }
    } else {
      console.log('⚠️ Aucune image n\'a été convertie avec succès.');
    }
    
    return { totalOriginalSize, totalNewSize, fileCount, deletedCount };
  } catch (err) {
    console.error('❌ Erreur lors du traitement du dossier:', err);
    return { totalOriginalSize: 0, totalNewSize: 0, fileCount: 0, deletedCount: 0 };
  }
}

/**
 * Point d'entrée principal
 */
async function main() {
  console.log('🚀 Démarrage de la conversion avec les paramètres suivants:');
  console.log(`   - Dossier source:       ${SOURCE_DIR}`);
  console.log(`   - Dossier destination:  ${DESTINATION_DIR}`);
  console.log(`   - Qualité:              ${QUALITY}%`);
  
  if (MAX_WIDTH) {
    console.log(`   - Largeur maximale:     ${MAX_WIDTH}px`);
  } else {
    console.log(`   - Largeur maximale:     Non limitée`);
  }
  
  console.log(`   - Supprimer originaux:  ${DELETE_ORIGINALS ? 'Oui' : 'Non'}`);
  console.log(`   - Extensions:           ${SOURCE_EXTENSION} → ${TARGET_EXTENSION}`);
  console.log('');
  
  await convertDirectory(SOURCE_DIR, DESTINATION_DIR, QUALITY, MAX_WIDTH, DELETE_ORIGINALS);
}

// Exécuter le script
main().catch(err => {
  console.error('❌ Erreur fatale:', err);
  process.exit(1);
});