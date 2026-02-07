export const initialCvHtml = `
<div class="cv-wrapper">
  <aside class="sidebar">
    <section>
      <h2>CONTACTS</h2>
      <ul class="contact-list">
        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> alex.doe@example.com</li>
        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> alexdoe-portfolio.dev</li>
        <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> San Francisco, CA</li>
      </ul>
    </section>
    <section>
      <h2>SKILLS</h2>
      <ul class="skills-list">
        <li>React & Next.js</li>
        <li>Node.js & Express</li>
        <li>TypeScript</li>
        <li>GraphQL & Apollo</li>
        <li>SQL & NoSQL Databases</li>
        <li>Cloud Infrastructure (AWS/GCP)</li>
      </ul>
    </section>
    <section>
      <h2>KEY ACHIEVEMENTS</h2>
      <ul class="achievements-list">
        <li>
          <h3>Lead Front-End Overhaul</h3>
          <p>Led the migration of a legacy front-end to a modern Next.js stack, improving performance by 60% and developer productivity by 40%.</p>
        </li>
        <li>
          <h3>API Design & Implementation</h3>
          <p>Designed and built a scalable GraphQL API that now serves over 1 million requests per day, with an average response time under 150ms.</p>
        </li>
        <li>
          <h3>Mentorship & Team Growth</h3>
          <p>Mentored three junior developers, two of whom were promoted to mid-level roles within 18 months.</p>
        </li>
      </ul>
    </section>
    <section>
      <h2>INTERESTS</h2>
      <ul class="interests-list">
        <li>
          <h3>Open Source Contribution</h3>
          <p>Active contributor to several open-source projects in the JavaScript ecosystem, focusing on developer tools and libraries.</p>
        </li>
        <li>
          <h3>Competitive Programming</h3>
          <p>Enjoy solving complex algorithmic challenges and participating in online coding competitions.</p>
        </li>
        <li>
          <h3>Landscape Photography</h3>
          <p>Passionate about capturing the beauty of natural landscapes during hiking and travel adventures.</p>
        </li>
      </ul>
    </section>
  </aside>
  <main class="main-content">
    <header class="cv-header">
      <h1>ALEX DOE</h1>
      <div class="subtitle">SENIOR SOFTWARE ENGINEER | FULL-STACK DEVELOPMENT | CLOUD ARCHITECTURE</div>
    </header>
    <section>
      <h2>SUMMARY</h2>
      <p>A results-driven Senior Software Engineer with 8+ years of experience in designing, developing, and deploying high-performance web applications. Expertise in full-stack JavaScript development, with a strong focus on modern front-end frameworks and scalable back-end architecture. Passionate about writing clean, maintainable code and building products that provide exceptional user experiences.</p>
    </section>
    <section class="experience">
      <h2>EXPERIENCE</h2>
      <div class="job">
        <div class="job-header">
          <h3>Senior Software Engineer</h3>
          <span>San Francisco, CA</span>
        </div>
        <div class="job-subheader">
          <h4>Tech Innovators Inc.</h4>
          <span>03/2021 - Present</span>
        </div>
        <ul>
          <li>Architect and develop new user-facing features using React.js and Next.js, resulting in a 25% increase in user engagement.</li>
          <li>Build reusable components and front-end libraries for future use, streamlining development and ensuring UI consistency.</li>
          <li>Optimize components for maximum performance across a vast array of web-capable devices and browsers.</li>
          <li>Collaborate with product managers and designers to translate product requirements into technical solutions.</li>
          <li>Write and maintain robust back-end services using Node.js, Express, and TypeScript.</li>
        </ul>
      </div>
      <div class="job">
        <div class="job-header">
          <h3>Software Engineer</h3>
          <span>Palo Alto, CA</span>
        </div>
        <div class="job-subheader">
          <h4>Creative Solutions Co.</h4>
          <span>07/2018 - 02/2021</span>
        </div>
        <ul>
          <li>Developed and maintained client-side logic for a large-scale e-commerce platform using React and Redux.</li>
          <li>Worked closely with the design team to implement pixel-perfect user interfaces from mockups and wireframes.</li>
          <li>Integrated with various third-party APIs for payment processing, shipping, and analytics.</li>
          <li>Participated in code reviews to maintain a high standard of code quality and provide constructive feedback to peers.</li>
        </ul>
      </div>
      <div class="job">
        <div class="job-header">
          <h3>Junior Web Developer</h3>
          <span>Mountain View, CA</span>
        </div>
        <div class="job-subheader">
          <h4>Web Wizards Agency</h4>
          <span>06/2016 - 06/2018</span>
        </div>
        <ul>
          <li>Assisted in the development of brochure websites and small web applications for various clients using HTML, CSS, and JavaScript (jQuery).</li>
          <li>Gained experience with version control (Git) and agile development methodologies.</li>
          <li>Provided support and maintenance for existing client websites.</li>
        </ul>

      </div>
    </section>
    <section>
      <h2>EDUCATION</h2>
       <div class="education-item">
        <div class="education-header">
          <h3>Stanford University</h3>
          <span>Stanford, CA</span>
        </div>
        <div class="education-subheader">
          <h4>B.S. in Computer Science</h4>
          <span>09/2012 - 06/2016</span>
        </div>
      </div>
    </section>
    <section>
      <h2>LANGUAGES</h2>
      <div class="languages-container">
        <div class="language-item">
          <p><strong>ENGLISH</strong> Native</p>
          <div class="dots">
            <span class="dot filled"></span><span class="dot filled"></span><span class="dot filled"></span><span class="dot filled"></span><span class="dot filled"></span>
          </div>
        </div>
        <div class="language-item">
          <p><strong>GERMAN</strong> Conversational</p>
          <div class="dots">
            <span class="dot filled"></span><span class="dot filled"></span><span class="dot filled"></span><span class="dot"></span><span class="dot"></span>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>
`
