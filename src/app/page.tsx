import Hero from '@/components/sections/Hero';
import CallToAction from '@/components/sections/CallToAction';

export default function HomePage() {
  return (
    <main className="relative bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* 3D Scrollytelling Experience - Temporarily disabled */}
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-96 h-96 bg-black mx-auto mb-8 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">3D ANIMATION PLACEHOLDER</span>
          </div>
          <p className="text-black text-lg">Ready for your 3D implementation</p>
        </div>
      </div>
      
      {/* Call to Action */}
      <CallToAction />
    </main>
  );
}
