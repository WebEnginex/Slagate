import os
from PIL import Image
import sys

def convert_png_to_webp(directory, quality=80):
    """
    Convertit tous les fichiers PNG dans le répertoire spécifié en WebP,
    puis remplace les fichiers PNG originaux.
    
    Args:
        directory (str): Chemin du dossier contenant les images PNG
        quality (int): Qualité de compression (0-100), par défaut 80
    """
    # Vérifie si le répertoire existe
    if not os.path.isdir(directory):
        print(f"Erreur: Le répertoire '{directory}' n'existe pas.")
        return
    
    png_files = []
    
    # Recherche tous les fichiers PNG
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.png'):
                png_files.append(os.path.join(root, file))
    
    if not png_files:
        print(f"Aucun fichier PNG trouvé dans '{directory}'.")
        return
    
    print(f"Trouvé {len(png_files)} fichiers PNG à convertir.")
    
    # Convertit chaque fichier PNG en WebP
    converted = 0
    failed = 0
    
    for png_file in png_files:
        try:
            # Obtient le chemin du fichier WebP (même nom, extension différente)
            webp_file = os.path.splitext(png_file)[0] + '.webp'
            
            # Ouvre et convertit l'image
            image = Image.open(png_file)
            
            # Préserve la transparence si elle existe
            if image.mode in ('RGBA', 'LA') or (image.mode == 'P' and 'transparency' in image.info):
                image.save(webp_file, 'WEBP', quality=quality, lossless=False)
            else:
                image.save(webp_file, 'WEBP', quality=quality)
            
            # Vérifie que le fichier WebP a été créé avec succès
            if os.path.exists(webp_file):
                # Supprime le fichier PNG original
                os.remove(png_file)
                converted += 1
                print(f"Converti: {png_file} -> {webp_file}")
            else:
                print(f"Échec de sauvegarde: {webp_file}")
                failed += 1
                
        except Exception as e:
            print(f"Erreur lors de la conversion de {png_file}: {e}")
            failed += 1
    
    print(f"\nConversion terminée.")
    print(f"Fichiers convertis avec succès: {converted}")
    print(f"Échecs: {failed}")

if __name__ == "__main__":
    # Si un répertoire est fourni en argument
    if len(sys.argv) > 1:
        directory = sys.argv[1]
        # Si une qualité est spécifiée
        quality = int(sys.argv[2]) if len(sys.argv) > 2 else 80
        convert_png_to_webp(directory, quality)
    else:
        # Utilise le répertoire courant si aucun n'est spécifié
        print("Aucun répertoire spécifié. Utilisation du répertoire courant.")
        convert_png_to_webp(".", 80)
        
        print("\nUtilisation:")
        print("python convert_png_to_webp.py [chemin_du_dossier] [qualité]")
        print("  [chemin_du_dossier]: Chemin du dossier contenant les PNG (par défaut: dossier courant)")
        print("  [qualité]: Niveau de qualité de 0 à 100 (par défaut: 80)")