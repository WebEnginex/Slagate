
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type FeatureCardProps = {
  title: string;
  description: string;
  actionText: string;
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const FeatureCard = ({
  title,
  description,
  actionText,
  icon,
  className,
  onClick
}: FeatureCardProps) => {
  return (
    <div className={cn("feature-card", className)}>
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <Button 
        variant="outline" 
        className="w-full justify-center" 
        onClick={onClick}
      >
        {actionText}
      </Button>
    </div>
  );
};

export default FeatureCard;
