export const initialCvCss = `
* {
  box-sizing: border-box;
}

body {
  font-family: 'Alegreya', serif;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  margin: 0;
}

ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

h1, h2, h3 {
  font-family: 'Belleza', sans-serif;
}

.cv-wrapper {
  max-width: 900px;
  margin: 2rem auto;
  display: flex;
  background-color: hsl(var(--card));
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border: 1px solid hsl(var(--border));
}

.sidebar {
  flex-basis: 35%;
  flex-shrink: 0;
  background-color: hsl(var(--sidebar-bg));
  padding: 1.5rem;
  border-right: 1px solid hsl(var(--border));
}

.main-content {
  flex-basis: 65%;
  flex-grow: 1;
  padding: 1.5rem;
}

.cv-header h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.subtitle {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  font-size: 0.9rem;
  font-weight: bold;
}

section {
  margin-bottom: 1.5rem;
}

section:last-child {
  margin-bottom: 0;
}

h2 {
  font-size: 1.25rem;
  text-transform: uppercase;
  color: hsl(var(--primary));
  border-bottom: 2px solid hsl(var(--border));
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.sidebar section h2 {
    font-size: 1rem;
}

.contact-list li, .skills-list li, .achievements-list li, .interests-list li {
  margin-bottom: 0.75rem;
}

.contact-list li {
  display: flex;
  align-items: center;
}

.contact-list svg {
  margin-right: 0.75rem;
  width: 1rem;
  height: 1rem;
  color: hsl(var(--primary));
}

.achievements-list h3, .interests-list h3 {
    font-family: 'Alegreya', serif;
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 0.25rem;
}

.experience .job {
  margin-bottom: 1.5rem;
}
.experience .job:last-child {
  margin-bottom: 0;
}

.job-header, .job-subheader, .education-header, .education-subheader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.job-header h3 {
  font-size: 1.1rem;
  font-weight: bold;
}

.job-subheader h4 {
    font-size: 1rem;
    font-weight: normal;
    font-style: italic;
}

.experience ul {
  list-style-position: outside;
  padding-left: 1.25rem;
}

.experience ul li {
  margin-bottom: 0.5rem;
  list-style-type: disc;
}

.education-item {
    margin-bottom: 1rem;
}

.training-container .training-item {
    margin-bottom: 1rem;
}

.training-item h3 {
    font-weight: bold;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.dots {
  display: flex;
  gap: 0.25rem;
}

.dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: 1px solid hsl(var(--border));
}

.dot.filled {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
}

@media print {
  body {
    background-color: #fff;
    color: #000 !important;
  }
  .cv-wrapper {
    display: block;
    max-width: 100%;
    margin: 0;
    box-shadow: none;
    border: none;
  }
  .sidebar, .main-content {
    flex-basis: auto;
    width: 100%;
    padding: 0;
    background-color: transparent !important;
  }
  .subtitle {
      background-color: #eee !important;
      color: #000 !important;
  }
  .sidebar {
      border: 0;
  }
  h2 {
    color: #000 !important;
    border-color: #ccc !important;
  }
  .dot.filled {
    background-color: #000 !important;
    border-color: #000 !important;
  }
}
`