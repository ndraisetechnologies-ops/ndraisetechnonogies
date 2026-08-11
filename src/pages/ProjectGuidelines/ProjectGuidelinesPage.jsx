import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, Code2, Rocket, FileText, Layout, 
  ExternalLink, Github, Terminal, Cpu, ShieldCheck, HelpCircle, 
  BookOpen, Sparkles, AlertCircle, Send, CheckSquare, Layers
} from 'lucide-react';
import './ProjectGuidelinesPage.css';

// Dynamic Guidelines Resolver for any project or task
export function resolveProjectGuidelines(projectInput) {
  const p = projectInput || {};
  const rawTitle = p.title || p.name || 'Task 1: Personal Portfolio Website';
  const domain = p.domain || p.trackTitle || p.category || 'Virtual Internship Track';
  const desc = p.desc || p.description || p.overview || 'Design and build a responsive developer portfolio website showcasing your skills, bio, project gallery, and contact form.';
  const difficulty = p.difficulty || p.level || 'Beginner to Intermediate';

  const titleLower = rawTitle.toLowerCase();

  // 1. Portfolio Website Task
  if (titleLower.includes('portfolio')) {
    return {
      title: rawTitle.startsWith('Task') ? rawTitle : `Task 1: ${rawTitle}`,
      domain: domain.includes('Track') ? domain : `${domain} Internship Track`,
      duration: '4-Week Milestone Task',
      level: difficulty,
      status: 'Assigned',
      techStack: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Responsive Grid'],
      dueDate: 'August 24, 2026',
      overview: desc,
      whatToDo: {
        objectives: [
          'Design a modern, mobile-responsive Developer Portfolio with high visual appeal.',
          'Build a Hero Section introducing your name, title, bio summary, and social links.',
          'Create a Skills & Tech Stack section displaying interactive badges and icons.',
          'Develop a Project Gallery grid showing cards with live demo and GitHub links.',
          'Add a functional Contact Form with client-side validation and feedback.'
        ],
        deliverables: [
          { id: 1, title: 'Public GitHub Repository', desc: 'Complete portfolio source code with clean commit history.' },
          { id: 2, title: 'Live Hosted Link', desc: 'Active deployment URL on Vercel, Netlify, or GitHub Pages.' },
          { id: 3, title: 'README.md File', desc: 'Comprehensive setup guide with screenshot previews.' },
          { id: 4, title: 'LinkedIn Showcase', desc: 'Project demonstration post tagging #ndraisetechnologies.' }
        ]
      },
      howToDo: [
        {
          phase: 'Phase 1: Structure & Design Tokens',
          icon: Layout,
          steps: [
            'Create semantic HTML5 layout tags (<header>, <nav>, <main>, <section>, <footer>).',
            'Define CSS custom variables for typography fonts, spacing, and dark/light color themes.',
            'Build responsive Navigation Bar with smooth scroll jump links.'
          ]
        },
        {
          phase: 'Phase 2: Hero & About Me Sections',
          icon: Code2,
          steps: [
            'Design Hero container with headshot image, animated headline, and resume download CTA.',
            'Construct About Me section detailing your education, background, and career goals.'
          ]
        },
        {
          phase: 'Phase 3: Interactive Project Gallery & Skills',
          icon: Cpu,
          steps: [
            'Build responsive project cards with hover zoom effects, tech badges, live demo and code links.',
            'Add skills grid showcasing proficiency badges for HTML, CSS, JavaScript, React, and Git.'
          ]
        },
        {
          phase: 'Phase 4: Contact Form & Deployment',
          icon: Terminal,
          steps: [
            'Implement JavaScript form validation for name, email address, and message fields.',
            'Deploy repository to Vercel/GitHub Pages and test mobile browser responsiveness.'
          ]
        }
      ],
      howToFinish: {
        checklist: [
          'Portfolio is 100% responsive across desktop, tablet, and mobile screens.',
          'GitHub repository is PUBLIC with all code files and README.md included.',
          'Live hosted demo URL is working and opens cleanly.',
          'Contact form validates input fields correctly.'
        ],
        evaluation: [
          { criteria: 'Visual Aesthetics & Layout Finish', weight: '35%' },
          { criteria: 'Mobile Responsiveness & CSS Polish', weight: '30%' },
          { criteria: 'Code Quality & Semantic HTML', weight: '25%' },
          { criteria: 'GitHub README & Deployment', weight: '10%' }
        ]
      }
    };
  }

  // 2. Interactive Web Application / Weather / Quiz Task
  if (titleLower.includes('interactive') || titleLower.includes('weather') || titleLower.includes('quiz') || titleLower.includes('music')) {
    return {
      title: rawTitle.startsWith('Task') ? rawTitle : `Task 2: ${rawTitle}`,
      domain: domain.includes('Track') ? domain : `${domain} Internship Track`,
      duration: '4-Week Milestone Task',
      level: difficulty,
      status: 'Assigned',
      techStack: ['JavaScript ES6+', 'React.js', 'Fetch API', 'CSS Grid', 'LocalStorage'],
      dueDate: 'August 24, 2026',
      overview: desc,
      whatToDo: {
        objectives: [
          'Develop an interactive single-page application using modern JavaScript or React hooks.',
          'Implement dynamic DOM updates, event listeners, and real-time state management.',
          'Integrate external web API (e.g. OpenWeather, Quiz API) or browser storage persistence.',
          'Build user-friendly loading indicators and error state callouts.'
        ],
        deliverables: [
          { id: 1, title: 'Public GitHub Repository', desc: 'Modular source code with structured files.' },
          { id: 2, title: 'Live Hosted Demo', desc: 'Deployed application URL on Netlify or Vercel.' },
          { id: 3, title: 'README Documentation', desc: 'Detailed explanation of app logic and setup steps.' }
        ]
      },
      howToDo: [
        {
          phase: 'Phase 1: Data Architecture & API Setup',
          icon: Terminal,
          steps: [
            'Define state variables and JSON data schema.',
            'Test API fetch requests in browser console or Postman.'
          ]
        },
        {
          phase: 'Phase 2: UI State & Search Controls',
          icon: Layout,
          steps: [
            'Build search input, filter chips, and loading spinner components.',
            'Render dynamic items based on user queries.'
          ]
        },
        {
          phase: 'Phase 3: Persistence & Edge Cases',
          icon: Cpu,
          steps: [
            'Persist user preferences or search history in browser LocalStorage.',
            'Add fallback error banners when API calls fail or return no matches.'
          ]
        }
      ],
      howToFinish: {
        checklist: [
          'Application handles user interactions smoothly with 0 console errors.',
          'UI presents loading states and empty result messages clearly.',
          'GitHub repository is public with live hosted demo link.'
        ],
        evaluation: [
          { criteria: 'State Management & JS Logic', weight: '35%' },
          { criteria: 'API Integration & Error Handling', weight: '35%' },
          { criteria: 'UI Design & Responsiveness', weight: '20%' },
          { criteria: 'Documentation & Readme', weight: '10%' }
        ]
      }
    };
  }

  // 3. E-Commerce / Full Stack Task
  if (titleLower.includes('commerce') || titleLower.includes('full stack') || titleLower.includes('store')) {
    return {
      title: rawTitle.startsWith('Task') ? rawTitle : `Task 3: ${rawTitle}`,
      domain: domain.includes('Track') ? domain : `${domain} Internship Track`,
      duration: '4-Week Milestone Task',
      level: difficulty,
      status: 'Assigned',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB / Mock API', 'Vanilla CSS'],
      dueDate: 'August 24, 2026',
      overview: desc,
      whatToDo: {
        objectives: [
          'Build a modern, responsive e-commerce web application.',
          'Implement product filtering, category sorting, and search query inputs.',
          'Construct global Shopping Cart state for quantity adjustments and price calculations.',
          'Design Checkout Flow with order summary modal and validation.'
        ],
        deliverables: [
          { id: 1, title: 'Public GitHub Repository', desc: 'Full application source code.' },
          { id: 2, title: 'Live Hosted Link', desc: 'Deployed live link on Vercel / Netlify.' },
          { id: 3, title: 'README.md Guide', desc: 'Setup commands and API documentation.' }
        ]
      },
      howToDo: [
        {
          phase: 'Phase 1: Project Setup & Components',
          icon: Layout,
          steps: [
            'Initialize Vite React project and setup CSS design tokens.',
            'Build Header, Product Grid, and Cart Drawer components.'
          ]
        },
        {
          phase: 'Phase 2: Cart Logic & State',
          icon: Code2,
          steps: [
            'Implement Cart Context for adding, updating, and clearing items.',
            'Save active cart items in LocalStorage.'
          ]
        },
        {
          phase: 'Phase 3: Checkout & Deployment',
          icon: Cpu,
          steps: [
            'Build checkout modal form with input validation.',
            'Deploy live demo to Vercel and verify responsiveness.'
          ]
        }
      ],
      howToFinish: {
        checklist: [
          'Product catalog, cart, and checkout workflows operate without errors.',
          'GitHub repository is public with README file included.',
          'Live demo URL is active and accessible.'
        ],
        evaluation: [
          { criteria: 'UI Design & Responsiveness', weight: '30%' },
          { criteria: 'Code Architecture & State Logic', weight: '30%' },
          { criteria: 'Feature Completeness', weight: '30%' },
          { criteria: 'Documentation & Readme', weight: '10%' }
        ]
      }
    };
  }

  // 4. Default Fallback Generator for any other task
  return {
    title: rawTitle,
    domain: domain.includes('Track') ? domain : `${domain} Track`,
    duration: '4-Week Milestone Task',
    level: difficulty,
    status: 'Assigned',
    techStack: p.skills || ['JavaScript', 'React.js', 'Node.js', 'CSS3'],
    dueDate: 'August 24, 2026',
    overview: desc,
    whatToDo: {
      objectives: [
        `Implement all features and requirements specified for ${rawTitle}.`,
        'Structure clean, modular, and maintainable source code.',
        'Ensure full mobile responsiveness and cross-browser support.',
        'Document setup commands and architecture in README.md.'
      ],
      deliverables: [
        { id: 1, title: 'Public GitHub Repository', desc: 'Complete project code with clean commits.' },
        { id: 2, title: 'Live Hosted Link', desc: 'Active deployment URL (Vercel, Netlify, or Render).' },
        { id: 3, title: 'README.md Documentation', desc: 'Clear setup commands and feature summary.' }
      ]
    },
    howToDo: [
      {
        phase: 'Phase 1: Planning & Setup',
        icon: Terminal,
        steps: [
          'Review requirement specifications and initialize repository.',
          'Setup layout files and install necessary dependencies.'
        ]
      },
      {
        phase: 'Phase 2: Feature Development',
        icon: Code2,
        steps: [
          `Develop the core functionality for ${rawTitle}.`,
          'Connect user inputs and state persistence logic.'
        ]
      },
      {
        phase: 'Phase 3: QA & Deployment',
        icon: Cpu,
        steps: [
          'Test mobile responsiveness and edge cases.',
          'Push code to GitHub and host live URL.'
        ]
      }
    ],
    howToFinish: {
      checklist: [
        'All project features operate cleanly with 0 console errors.',
        'GitHub repository is public with live hosted demo link.',
        'README.md file is added to root directory.'
      ],
      evaluation: [
        { criteria: 'Feature Completeness & Logic', weight: '40%' },
        { criteria: 'Code Quality & Responsiveness', weight: '40%' },
        { criteria: 'Documentation & Submission', weight: '20%' }
      ]
    }
  };
}

export default function ProjectGuidelinesPage({ 
  project, 
  onBack, 
  onSubmitTaskClick,
  setCurrentView 
}) {
  const [activeTab, setActiveTab] = useState('what-to-do');
  
  // Resolve guidelines based on the passed task/project object
  const guidelines = resolveProjectGuidelines(project);

  return (
    <div className="project-guidelines-page">
      
      {/* Top Header Bar */}
      <div className="guidelines-header-banner">
        <button className="btn-back-link" onClick={onBack || (() => setCurrentView && setCurrentView('student-dashboard'))}>
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>

        <div className="guidelines-title-row">
          <div>
            <div className="guidelines-tag">
              <Sparkles size={14} className="sparkle-icon" />
              <span>ASSIGNED PROJECT GUIDELINES</span>
            </div>
            <h1 className="guidelines-main-title">{guidelines.title}</h1>
            <p className="guidelines-domain-sub">{guidelines.domain}</p>
          </div>

          <div className="guidelines-status-badge">
            <span className="pulse-green-dot"></span>
            <span>{guidelines.status || 'In Progress'}</span>
          </div>
        </div>

        {/* Key Meta Details Strip */}
        <div className="guidelines-meta-strip">
          <div className="guidelines-meta-pill">
            <span>Duration:</span> <strong>{guidelines.duration}</strong>
          </div>
          <div className="guidelines-meta-pill">
            <span>Level:</span> <strong>{guidelines.level}</strong>
          </div>
          <div className="guidelines-meta-pill">
            <span>Due Date:</span> <strong>{guidelines.dueDate}</strong>
          </div>
          <div className="guidelines-meta-pill tech-pill">
            <span>Stack:</span> <strong>{guidelines.techStack?.join(' • ')}</strong>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="guidelines-container">
        
        {/* Navigation Tabs */}
        <div className="guidelines-tab-bar">
          <button 
            className={`tab-btn ${activeTab === 'what-to-do' ? 'active' : ''}`}
            onClick={() => setActiveTab('what-to-do')}
          >
            <BookOpen size={18} />
            <span>1. What To Do</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'how-to-do' ? 'active' : ''}`}
            onClick={() => setActiveTab('how-to-do')}
          >
            <Code2 size={18} />
            <span>2. How To Do</span>
          </button>

          <button 
            className={`tab-btn ${activeTab === 'how-to-finish' ? 'active' : ''}`}
            onClick={() => setActiveTab('how-to-finish')}
          >
            <Rocket size={18} />
            <span>3. How To Finish</span>
          </button>
        </div>

        {/* Tab 1: WHAT TO DO */}
        {activeTab === 'what-to-do' && (
          <div className="guidelines-tab-content fade-in">
            <div className="guidelines-card-panel">
              <h2 className="panel-heading">
                <BookOpen size={22} className="heading-icon blue" />
                <span>Project Overview & Scope</span>
              </h2>
              <p className="overview-paragraph">{guidelines.overview}</p>

              <h3 className="sub-section-title">Key Core Objectives</h3>
              <ul className="objectives-list">
                {guidelines.whatToDo.objectives.map((obj, i) => (
                  <li key={i}>
                    <CheckCircle2 size={18} className="check-icon" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="guidelines-card-panel margin-top">
              <h2 className="panel-heading">
                <FileText size={22} className="heading-icon emerald" />
                <span>Required Deliverables</span>
              </h2>

              <div className="deliverables-grid">
                {guidelines.whatToDo.deliverables.map((item) => (
                  <div key={item.id} className="deliverable-card">
                    <div className="deliv-number">0{item.id}</div>
                    <h4 className="deliv-title">{item.title}</h4>
                    <p className="deliv-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: HOW TO DO */}
        {activeTab === 'how-to-do' && (
          <div className="guidelines-tab-content fade-in">
            <div className="guidelines-card-panel">
              <h2 className="panel-heading">
                <Layers size={22} className="heading-icon purple" />
                <span>Step-by-Step Implementation Guide</span>
              </h2>
              <p className="overview-paragraph">
                Follow this recommended execution roadmap to systematically plan, code, and test your project from scratch.
              </p>

              <div className="roadmap-phases-wrapper">
                {guidelines.howToDo.map((phaseObj, idx) => {
                  const IconComp = phaseObj.icon || Code2;
                  return (
                    <div key={idx} className="roadmap-phase-box">
                      <div className="phase-header">
                        <div className="phase-icon-circle">
                          <IconComp size={20} />
                        </div>
                        <h3 className="phase-title">{phaseObj.phase}</h3>
                      </div>
                      
                      <ul className="phase-steps-list">
                        {phaseObj.steps.map((step, sIdx) => (
                          <li key={sIdx}>
                            <span className="step-bullet">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: HOW TO FINISH */}
        {activeTab === 'how-to-finish' && (
          <div className="guidelines-tab-content fade-in">
            
            {/* Verification Checklist */}
            <div className="guidelines-card-panel">
              <h2 className="panel-heading">
                <ShieldCheck size={22} className="heading-icon green" />
                <span>Pre-Submission Verification Checklist</span>
              </h2>

              <ul className="checklist-group">
                {guidelines.howToFinish.checklist.map((item, idx) => (
                  <li key={idx} className="checklist-item">
                    <CheckSquare size={20} className="check-box-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Evaluation Weightage */}
            <div className="guidelines-card-panel margin-top">
              <h2 className="panel-heading">
                <Sparkles size={22} className="heading-icon amber" />
                <span>Evaluation & Grading Criteria</span>
              </h2>

              <div className="evaluation-grid">
                {guidelines.howToFinish.evaluation.map((evalItem, idx) => (
                  <div key={idx} className="eval-card">
                    <div className="eval-weight">{evalItem.weight}</div>
                    <div className="eval-name">{evalItem.criteria}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Submission Banner */}
            <div className="guidelines-card-panel submission-cta-panel margin-top">
              <div className="cta-left">
                <Rocket size={36} className="rocket-cta-icon" />
                <div>
                  <h3 className="cta-title">Ready to Submit Your Project Task?</h3>
                  <p className="cta-desc">
                    Provide your public GitHub repository link and hosted live demo URL. Your submission will be reviewed by technical mentors within 24 hours.
                  </p>
                </div>
              </div>

              <button 
                type="button" 
                className="btn-primary btn-submit-project"
                onClick={onSubmitTaskClick || (() => alert('Opening Task Submission Modal...'))}
              >
                <Send size={18} />
                <span>Submit Project Task</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
