import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, Users, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TabButton from '../components/corner/TabButton';
import StudentTab from '../components/corner/StudentTab';
import RecruiterTab from '../components/corner/RecruiterTab';
import CollegeTab from '../components/corner/CollegeTab';
import VerifyTab from '../components/corner/VerifyTab';

type Tab = 'students' | 'recruiters' | 'colleges' | 'verify';

export default function CornerPage() {
  const [activeTab, setActiveTab] = useState<Tab>('students');

  return (
    <div className="relative min-h-screen bg-void text-cream overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs text-muted hover:text-gold transition-colors mb-10"
                data-hover
              >
                <ArrowLeft size={14} />
                Back to Home
              </Link>

              <span className="text-xs font-body font-medium tracking-[0.3em] uppercase text-gold mb-6 block">
                Talent & Verification Hub
              </span>
              <h1 className="font-serif text-pearl font-light text-4xl lg:text-6xl leading-tight mb-6 max-w-2xl">
                The <em className="text-gold not-italic">Corner</em>
              </h1>
              <p className="text-muted text-base lg:text-lg leading-relaxed font-light max-w-xl">
                A dedicated space for students seeking opportunities, recruiters vetting talent, 
                and academic institutions verifying achievements.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tabs */}
        <section className="relative pb-32 lg:pb-40">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            {/* Tab navigation */}
            <div className="flex justify-center mb-16">
              <div className="inline-flex items-center gap-1 p-1.5 rounded-xl bg-surface/40 border border-gold/5 flex-wrap justify-center">
                <TabButton
                  active={activeTab === 'students'}
                  onClick={() => setActiveTab('students')}
                  label="Students"
                  icon={<GraduationCap size={16} />}
                />
                <TabButton
                  active={activeTab === 'recruiters'}
                  onClick={() => setActiveTab('recruiters')}
                  label="Recruiters"
                  icon={<Building2 size={16} />}
                />
                <TabButton
                  active={activeTab === 'colleges'}
                  onClick={() => setActiveTab('colleges')}
                  label="Colleges"
                  icon={<Users size={16} />}
                />
                <TabButton
                  active={activeTab === 'verify'}
                  onClick={() => setActiveTab('verify')}
                  label="Verify"
                  icon={<ShieldCheck size={16} />}
                />
              </div>
            </div>

            {/* Tab content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'students' && <StudentTab />}
              {activeTab === 'recruiters' && <RecruiterTab />}
              {activeTab === 'colleges' && <CollegeTab />}
              {activeTab === 'verify' && <VerifyTab />}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
