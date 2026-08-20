import React from 'react';
import { Code2, ArrowRight, Sparkles, ExternalLink, GitBranch, Layers } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../Motion/MotionUtils';
import './ProjectShowcase.css';

const PROJECTS = [
  {
    id: 'ecommerce-engine',
    title: 'Full Stack E-Commerce Platform',
    domain: 'Full Stack Development',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    desc: 'Build a production-grade online marketplace complete with real-time product filtering, JWT authentication, persistent cart state, and payment gateway integration.',
    level: 'Advanced',
    tasks: 3
  },
  {
    id: 'ai-classifier',
    title: 'Medical Image Classification Pipeline',
    domain: 'AI & Machine Learning',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI'],
    desc: 'Train a deep convolutional neural network to detect cellular anomalies in chest X-rays with 94%+ accuracy and deploy RESTful inference endpoints.',
    level: 'Intermediate',
    tasks: 3
  },
  {
    id: 'threat-dashboard',
    title: 'Automated SOC Security Dashboard',
    domain: 'Cyber Security',
    tags: ['Python', 'Wireshark', 'Bash', 'ELK Stack'],
    desc: 'Develop an automated network log parser that identifies SQL injection and brute-force patterns, generating real-time incident reports for security analysts.',
    level: 'Intermediate',
    tasks: 3
  },
  {
    id: 'algo-trading',
    title: 'Algorithmic Financial Bot & Analytics',
    domain: 'Python Programming',
    tags: ['Python', 'Pandas', 'Matplotlib', 'REST API'],
    desc: 'Implement moving average crossover trading strategies, backtest historical market data, and generate automated performance metrics and graphs.',
    level: 'Intermediate',
    tasks: 3
  }
];

export default function ProjectShowcase({ onOpenTasksModal }) {
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <section className="project-showcase-section" id="project-showcase">
      <div className="project-showcase-container">
        <FadeIn direction="up">
          <div className="project-showcase-header">
            <div className="project-badge badge-purple">
              <Sparkles size={15} />
              <span>HANDS-ON INDUSTRY PROJECTS</span>
            </div>
            <h2 className="project-title">
              Build Real <span>Portfolio Projects</span>
            </h2>
            <p className="project-subtitle">
              Every internship track includes assigned real-world projects that simulate actual software engineering sprints, giving you code to push to GitHub.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="projects-grid" staggerChildren={0.12}>
          {PROJECTS.map((proj) => (
            <StaggerItem key={proj.id}>
              <motion.div 
                className="project-card glass-panel"
                onMouseMove={handleMouseMove}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -8,
                        scale: 1.015,
                        transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
                      }
                }
              >
                <div className="project-card-header">
                  <div className="project-domain-tag">{proj.domain}</div>
                  <div className="project-tasks-tag">
                    <GitBranch size={12} /> {proj.tasks} Tasks
                  </div>
                </div>

                <h3 className="project-card-title">{proj.title}</h3>
                <p className="project-card-desc">{proj.desc}</p>

                {/* Tech Tags */}
                <div className="project-tags-row">
                  {proj.tags.map((t, idx) => (
                    <span key={idx} className="proj-tag">{t}</span>
                  ))}
                </div>

                {/* Card Action */}
                <div className="project-card-footer">
                  <motion.button
                    className="project-action-btn"
                    onClick={() => onOpenTasksModal && onOpenTasksModal({ title: proj.title, domain: proj.domain, desc: proj.desc })}
                    whileHover={shouldReduceMotion ? {} : { x: 3 }}
                  >
                    <span>View Project Guidelines</span>
                    <ArrowRight size={15} />
                  </motion.button>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
