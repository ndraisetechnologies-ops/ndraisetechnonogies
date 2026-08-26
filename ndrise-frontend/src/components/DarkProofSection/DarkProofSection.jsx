import React from 'react';
import { ShieldCheck, Cpu, Code2, Award, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn } from '../Motion/MotionUtils';
import './DarkProofSection.css';

export default function DarkProofSection() {
  const shouldReduceMotion = useReducedMotion();

  const nodes = [
    {
      id: 'skills',
      step: '01',
      title: 'Skills',
      subtitle: 'Structured 4-Week Tracks',
      icon: Cpu,
      color: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.25)'
    },
    {
      id: 'projects',
      step: '02',
      title: 'Projects',
      subtitle: '2–3 Real Industry Tasks',
      icon: Code2,
      color: '#818cf8',
      glow: 'rgba(129, 140, 248, 0.25)'
    },
    {
      id: 'certificates',
      step: '03',
      title: 'Certificates',
      subtitle: 'Instant QR Authentication',
      icon: Award,
      color: '#c084fc',
      glow: 'rgba(192, 132, 252, 0.25)'
    },
    {
      id: 'career',
      step: '04',
      title: 'Career Ready',
      subtitle: 'GitHub & LOR Validation',
      icon: Briefcase,
      color: '#34d399',
      glow: 'rgba(52, 211, 153, 0.25)'
    }
  ];

  return (
    <section className="dark-proof-section">
      {/* Deep Navy Background Lights */}
      <div className="dark-proof-ambient">
        <div className="dark-glow dark-glow-blue" />
        <div className="dark-glow dark-glow-purple" />
      </div>

      <div className="dark-proof-container">
        <FadeIn direction="up">
          <div className="dark-proof-header">
            <div className="dark-badge">
              <ShieldCheck size={15} />
              <span>THE VERIFIABLE LEARNING ARCHITECTURE</span>
            </div>
            <h2 className="dark-title">
              Turn learning into <span>proof.</span>
            </h2>
            <p className="dark-desc">
              Every domain task built, every repository committed, and every credential earned on ND Raise creates tamper-proof proof of your real engineering capabilities.
            </p>
          </div>
        </FadeIn>

        {/* Visual Architecture System Grid */}
        <div className="proof-system-stage">
          <div className="proof-nodes-grid">
            {nodes.map((node, idx) => {
              const Icon = node.icon;
              return (
                <React.Fragment key={node.id}>
                  <motion.div 
                    className="proof-node-card"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : {
                            y: -6,
                            scale: 1.02,
                            transition: { duration: 0.25 },
                          }
                    }
                  >
                    {/* Glowing Pulse Node Dot */}
                    <div className="pulse-node-dot" style={{ background: node.color, boxShadow: `0 0 14px ${node.color}` }} />
                    
                    <div 
                      className="proof-node-icon"
                      style={{ 
                        background: node.glow, 
                        color: node.color,
                        borderColor: `rgba(${node.color === '#38bdf8' ? '56,189,248' : node.color === '#818cf8' ? '129,140,248' : node.color === '#c084fc' ? '192,132,252' : '52,211,153'}, 0.3)` 
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <div className="proof-node-step">{node.step}</div>
                    <h3 className="proof-node-title">{node.title}</h3>
                    <p className="proof-node-sub">{node.subtitle}</p>
                  </motion.div>

                  {/* Animated Connecting Line Connector */}
                  {idx < nodes.length - 1 && (
                    <div className="proof-connector-line">
                      <span className="line-pulse-node" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
