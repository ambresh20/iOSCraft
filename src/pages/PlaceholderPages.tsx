import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layers, Cpu, GitBranch, Wrench, Info, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlaceholderProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

function PlaceholderPage({ title, icon, description }: PlaceholderProps) {
  return (
    <div className="container-content py-20 text-center max-w-2xl">
      <Helmet>
        <title>{title} | iOSCraft</title>
      </Helmet>
      <div className="w-20 h-20 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[var(--text-muted)]">
        {icon}
      </div>
      <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">{title}</h1>
      <p className="text-lg text-[var(--text-secondary)] mb-8">{description}</p>
      <div className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-xl p-6 text-sm mb-8">
        <strong className="block mb-2">Work in Progress</strong>
        This module is currently under development. Check back soon for new content, or subscribe to our newsletter for updates.
      </div>
      <Link to="/" className="btn-secondary inline-flex">
        Return to Home
      </Link>
    </div>
  );
}

export const SwiftUI = () => (
  <PlaceholderPage 
    title="SwiftUI" 
    icon={<Layers size={40} />} 
    description="Learn declarative UI development, state management, and modern view composition." 
  />
);

export const UIKit = () => (
  <PlaceholderPage 
    title="UIKit" 
    icon={<Cpu size={40} />} 
    description="Master the foundational UI framework of iOS. Learn Auto Layout, view controllers, and more." 
  />
);

export const Architecture = () => (
  <PlaceholderPage 
    title="iOS Architecture" 
    icon={<GitBranch size={40} />} 
    description="Build scalable apps using MVVM, Clean Architecture, Dependency Injection, and SOLID principles." 
  />
);

export const About = () => (
  <PlaceholderPage 
    title="About iOSCraft" 
    icon={<Info size={40} />} 
    description="iOSCraft is dedicated to helping developers master Swift and build world-class iOS applications." 
  />
);

export const Contact = () => (
  <PlaceholderPage 
    title="Contact Us" 
    icon={<Mail size={40} />} 
    description="Have a question or feedback? We'd love to hear from you." 
  />
);
