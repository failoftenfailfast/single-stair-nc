import type { Metadata } from 'next';
import Link from 'next/link';
import CallToAction from '@/components/sections/CallToAction';

export const metadata: Metadata = {
  title: 'Policymakers Starter Kit — Single Stair NC',
  description:
    'A practical starter kit for policymakers: model ordinance language, safety references, implementation checklist, and case studies for enabling single‑stair housing.',
};

export default function PolicymakersPage() {
  return (
    <div className="min-h-screen surface-primary">
      {/* Hero */}
      <section className="section-padding surface-inverse text-content-inverse">
        <div className="container-custom">
          <div className="max-w-5xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
              POLICYMAKER
              <br />
              STARTER KIT
            </h1>
            <div className="w-32 h-1 bg-brand-500 mb-8" />
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-10">
              Practical tools to enable safe, high‑quality single‑stair housing: model
              language, safety guidance, implementation steps, and real‑world
              examples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#model-language" className="bg-surface-primary text-content-primary hover:bg-brand-500 hover:text-white border border-border-primary px-8 py-4 font-medium transition-colors shadow-soft">
                VIEW MODEL LANGUAGE
              </Link>
              <Link href="/contact" className="border border-border-primary bg-surface-inverse text-content-inverse hover:bg-surface-primary hover:text-content-primary px-8 py-4 font-medium transition-colors shadow-soft">
                CONNECT WITH OUR TEAM
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-black bg-white p-6">
              <h3 className="text-lg font-black mb-3 tracking-wide">WHAT THIS COVERS</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Model ordinance language</li>
                <li>Safety and performance references</li>
                <li>Implementation checklist and timeline</li>
              </ul>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <h3 className="text-lg font-black mb-3 tracking-wide">WHO IT'S FOR</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>City and county staff</li>
                <li>Planning commissions</li>
                <li>Elected officials</li>
              </ul>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <h3 className="text-lg font-black mb-3 tracking-wide">HOW TO USE</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Adopt model language or adapt locally</li>
                <li>Coordinate safety review with fire/building</li>
                <li>Share case studies during outreach</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Model Language */}
      <section id="model-language" className="section-padding surface-primary">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-6">MODEL ORDINANCE LANGUAGE</h2>
            <p className="text-lg leading-relaxed mb-6">
              Use the following as a starting point. Adjust references to your
              local code edition and administrative processes.
            </p>
            <div className="bg-white border-2 border-black p-6 text-sm leading-relaxed">
              <p className="font-bold mb-2">Section X.XX — Single‑Stair Multifamily Dwellings</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Purpose. To allow well‑designed small‑to‑mid‑scale multifamily
                  buildings served by a single exit stair where safety
                  performance is met through enhanced life‑safety features.
                </li>
                <li>
                  Applicability. Buildings up to 6 stories and 85 ft in height,
                  with a maximum single travel distance consistent with adopted
                  code, may be served by one exit stair.
                </li>
                <li>
                  Required features. Projects utilizing this section shall
                  provide: sprinkler protection per NFPA 13, corridor smoke
                  control/compartmentation, egress windows per dwelling, and
                  fire‑department access as approved by the AHJ.
                </li>
                <li>
                  Site review. The Fire Code Official shall verify apparatus
                  access, hydrant spacing/flow, and staging.
                </li>
                <li>
                  Design review. The Building Official shall verify compliance
                  with structural, fire‑resistance, and mechanical/smoke control
                  provisions.
                </li>
              </ol>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/examples" className="btn-primary">SEE CASE STUDIES</Link>
              <Link href="/learn/articles" className="border-2 border-black px-6 py-3 font-semibold hover:bg-black hover:text-white transition-colors">READ RESEARCH</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Safety and References */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="border-2 border-black bg-white p-6">
              <h3 className="text-xl font-black mb-4">SAFETY + PERFORMANCE</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Full building sprinklers (NFPA 13) and alarm/monitoring</li>
                <li>Compartmentalized corridors and smoke‑tight doors</li>
                <li>Direct egress windows for bedrooms/living spaces</li>
                <li>Fire‑department access, hydrant spacing, and standpipes as required</li>
              </ul>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <h3 className="text-xl font-black mb-4">IMPLEMENTATION CHECKLIST</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Confirm local code edition and state amendments</li>
                <li>Draft ordinance text; coordinate with legal</li>
                <li>Set staff guidance: submittal, review triggers, inspections</li>
                <li>Plan outreach: FAQs, case studies, and developer guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Playbook */}
      <section className="section-padding surface-primary">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
            <div className="border-2 border-black bg-white p-6">
              <h3 className="text-lg font-black mb-3">STAFF PLAYBOOK</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Intake: flag single‑stair projects for coordinated review</li>
                <li>Building/Fire joint checkpoint at 30% and 90% design</li>
                <li>Pre‑construction meeting clarifying inspections</li>
              </ul>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <h3 className="text-lg font-black mb-3">CASE STUDIES</h3>
              <p className="text-sm mb-3">Built examples demonstrating safety, livability, and context‑sensitive design.</p>
              <Link href="/examples" className="underline font-semibold">Explore building examples →</Link>
            </div>
            <div className="border-2 border-black bg-white p-6">
              <h3 className="text-lg font-black mb-3">DATA + REFERENCES</h3>
              <p className="text-sm mb-3">Research, articles, and code references to support adoption.</p>
              <Link href="/learn/articles" className="underline font-semibold">Browse articles →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (concise) */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black mb-6">COMMON QUESTIONS</h2>
            <div className="space-y-4">
              <div className="border-2 border-black bg-white p-5">
                <div className="font-bold mb-2">How does a single stair meet life‑safety goals?</div>
                <p className="text-sm">Through sprinklers, smoke control/compartmentation, FD access, and sensible limits on size/height/travel distance verified by the AHJ.</p>
              </div>
              <div className="border-2 border-black bg-white p-5">
                <div className="font-bold mb-2">What’s the typical scale?</div>
                <p className="text-sm">Small‑to‑mid‑scale multifamily (e.g., walk‑ups or courtyard buildings) that fit neighborhood contexts while improving housing variety.</p>
              </div>
              <div className="border-2 border-black bg-white p-5">
                <div className="font-bold mb-2">How should staff coordinate reviews?</div>
                <p className="text-sm">Create a joint Building/Fire checkpoint early, standardize submittal requirements, and communicate inspection milestones up front.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CallToAction />
    </div>
  );
}


