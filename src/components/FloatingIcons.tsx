import React, { useEffect, useState } from "react";
import { Users, Shield, Heart, Clock, Car, MessageCircle } from "lucide-react";

interface FloatingIcon {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export const FloatingIcons = () => {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  const iconComponents = [Users, Shield, Heart, Clock, Car, MessageCircle];

  useEffect(() => {
    const generatedIcons: FloatingIcon[] = [];
    
    for (let i = 0; i < 6; i++) {
      generatedIcons.push({
        id: i,
        icon: iconComponents[i % iconComponents.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 5,
      });
    }
    
    setIcons(generatedIcons);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((iconData) => {
        const IconComponent = iconData.icon;
        return (
          <div
            key={iconData.id}
            className="absolute animate-bounce opacity-10"
            style={{
              left: `${iconData.x}%`,
              top: `${iconData.y}%`,
              animationDelay: `${iconData.delay}s`,
              animationDuration: `${iconData.duration}s`,
            }}
          >
            <IconComponent className="h-12 w-12 text-primary" />
          </div>
        );
      })}
    </div>
  );
};