"use client";

import AuthButton from "@/components/auth/auth-button";

type HomeContentProps = {
  dict: {
    welcome: string;
    description: string;
    features: {
      title: string;
      chat: string;
      group: string;
      video: string;
    };
  };
};

export default function HomeContent({ dict }: HomeContentProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <AuthButton />
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary mb-6">
            {dict.welcome}
          </h1>
          <p className="text-xl text-secondary mb-12">{dict.description}</p>

          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-foreground mb-6">
              {dict.features.title}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-center space-x-2 text-lg">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span className="text-foreground">{dict.features.chat}</span>
              </li>
              <li className="flex items-center justify-center space-x-2 text-lg">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span className="text-foreground">{dict.features.group}</span>
              </li>
              <li className="flex items-center justify-center space-x-2 text-lg">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span className="text-foreground">{dict.features.video}</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
