"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";

const heroImage =
  "/images/hf_20260509_214932_fe7b542e-34a7-4064-84db-fd70900a52f2 (2).png";
const aboutImage =
  "/images/hf_20260509_215533_9f5dce14-a92f-45ad-b6bf-7ed893faad0a (1).png";
const workflowImage =
  "/images/hf_20260519_080819_6991ee4d-3ee9-4f99-aee2-9ca5e1946730 (2).png";
const aiToolsImage =
  "/images/hf_20260519_093451_1880e17e-c8dc-4e72-89ee-8b4ef9af8a66 (2).png";
const salesImage =
  "/images/hf_20260519_080423_6a6170ad-1086-4515-8c32-3612fce3a449 (2).png";

const skills = [
  "Direct Response Video Editing",
  "Creative Strategy & Storytelling",
  "AI-Powered Content Creation",
];

const interests = [
  "Performance Marketing & Advertising",
  "Social Media Trends & Content Innovation",
  "Creative Branding & Digital Media",
];

const workflowSteps = [
  {
    title: "Research & Brief",
    detail:
      "Deep market research, competitor analysis, and audience psychology to define the hook and angle.",
  },
  {
    title: "Hook & Script",
    detail:
      "High-retention openings and concise storytelling built for conversions and watch time.",
  },
  {
    title: "Edit & Motion",
    detail:
      "Fast-paced editing, pattern interrupts, and motion design aligned with platform trends.",
  },
  {
    title: "Optimize & Scale",
    detail:
      "Iteration based on performance feedback to improve CTR, CVR, and retention metrics.",
  },
];

// ============================================================
//  VIDEO LINKS — SECTION 1 (Featured Work)
//  Cloudinary ke 15 links yahan paste karo (file: "...").
//  title aur tag optional hain, chahe to change kar lo.
// ============================================================
const featuredVideos = [
  { title: "Video 1", file: "", tag: "DTC Ad" },
  { title: "Video 2", file: "", tag: "Paid Social" },
  { title: "Video 3", file: "", tag: "Product Story" },
  { title: "Video 4", file: "", tag: "Hook Test" },
  { title: "Video 5", file: "", tag: "Direct Response" },
  { title: "Video 6", file: "", tag: "Conversion" },
  { title: "Video 7", file: "", tag: "DTC Ad" },
  { title: "Video 8", file: "", tag: "Paid Social" },
  { title: "Video 9", file: "", tag: "Product Story" },
  { title: "Video 10", file: "", tag: "Hook Test" },
  { title: "Video 11", file: "", tag: "Direct Response" },
  { title: "Video 12", file: "", tag: "Conversion" },
  { title: "Video 13", file: "", tag: "DTC Ad" },
  { title: "Video 14", file: "", tag: "Paid Social" },
  { title: "Video 15", file: "", tag: "Product Story" },
];

// ============================================================
//  VIDEO LINKS — SECTION 2 (More Examples)
//  Cloudinary ke 15 links yahan paste karo (file: "...").
// ============================================================
const moreVideos = [
  { title: "Example 1", file: "", tag: "Iteration" },
  { title: "Example 2", file: "", tag: "Conversion Focused" },
  { title: "Example 3", file: "", tag: "Performance Cut" },
  { title: "Example 4", file: "", tag: "Direct Response" },
  { title: "Example 5", file: "", tag: "Hook Test" },
  { title: "Example 6", file: "", tag: "Product Story" },
  { title: "Example 7", file: "", tag: "Iteration" },
  { title: "Example 8", file: "", tag: "Conversion Focused" },
  { title: "Example 9", file: "", tag: "Performance Cut" },
  { title: "Example 10", file: "", tag: "Direct Response" },
  { title: "Example 11", file: "", tag: "Hook Test" },
  { title: "Example 12", file: "", tag: "Product Story" },
  { title: "Example 13", file: "", tag: "Iteration" },
  { title: "Example 14", file: "", tag: "Conversion Focused" },
  { title: "Example 15", file: "", tag: "Performance Cut" },
];

const experienceCards = [
  {
    title: "Exceptional Creative Execution",
    detail:
      "High-converting DTC ads with strong hooks, clean editing, and engaging visuals.",
  },
  {
    title: "Transparent Communication",
    detail: "Fast responses, clear updates, and smooth collaboration.",
  },
  {
    title: "Ads Built to Scale",
    detail: "Performance-driven creatives focused on retention and conversions.",
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

function ParallaxImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-24, 24],
  );

  return (
    <div ref={imageRef} className="h-full overflow-hidden rounded-[24px]">
      <motion.img
        src={encodeURI(src)}
        alt={alt}
        className={`${className} scale-[1.08]`}
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.12 }}
        whileInView={{ opacity: 1, scale: 1.08 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      className="mb-10 max-w-3xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {eyebrow ? (
        <motion.p
          className="text-xs uppercase tracking-[0.3em] text-white/50"
          variants={itemVariants}
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        className="font-display mt-3 text-3xl text-white sm:text-4xl"
        variants={itemVariants}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          className="mt-3 text-base text-white/70 sm:text-lg"
          variants={itemVariants}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.16],
    shouldReduceMotion ? [0, 0] : [0, 96],
  );
  const ambientY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -320],
  );

  return (
    <div className="flex flex-1 flex-col" ref={containerRef}>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: smoothProgress }}
        aria-hidden="true"
      />
      <motion.div
        className="ambient-orb ambient-orb-primary"
        style={{ y: ambientY }}
        aria-hidden="true"
      />
      <motion.div
        className="ambient-orb ambient-orb-secondary"
        style={{ y: ambientY }}
        aria-hidden="true"
      />
      {/* Hero Section */}
      <motion.section
        className="section min-h-screen flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] w-full">
          <motion.div
            className="-mt-6 space-y-5 lg:-mt-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              className="text-xs uppercase tracking-[0.4em] text-white/50"
              variants={itemVariants}
            >
              Direct Response Video Editor
            </motion.p>
            <motion.h1
              className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.08] text-white"
              variants={itemVariants}
            >
              Harmain Ali
              <motion.span
                className="block text-gradient"
                variants={itemVariants}
              >
                Performance-Driven Video Creatives
              </motion.span>
            </motion.h1>
            <motion.p
              className="max-w-2xl text-base text-white/70 sm:text-lg"
              variants={itemVariants}
            >
              Creative and performance-driven editor with 2+ years of experience
              producing high-converting ads across multiple niches. I blend
              strategic storytelling, audience psychology, and modern editing
              techniques to maximize engagement and conversions.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={containerVariants}
            >
              <motion.a
                href="#work"
                className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-black hover:bg-white/90 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Work
              </motion.a>
              <motion.a
                href="#contact"
                className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white hover:border-white/40 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let&apos;s Connect
              </motion.a>
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={containerVariants}
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  className="tag rounded-full px-4 py-2 text-xs"
                  variants={itemVariants}
                  whileHover={{ scale: 1.08 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="relative"
            style={{ y: heroY }}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="hero-orb absolute -inset-4 rounded-[40px] bg-white/5 blur-2xl"
              animate={{
                boxShadow: [
                  "0 0 60px rgba(91, 212, 255, 0.2)",
                  "0 0 120px rgba(91, 212, 255, 0.35)",
                  "0 0 60px rgba(91, 212, 255, 0.2)",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <div className="card relative overflow-hidden rounded-[32px] p-2">
              <ParallaxImage
                src={heroImage}
                alt="Portrait of Harmain Ali"
                className="w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="section-tight min-h-screen flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] w-full">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionHeader
              eyebrow="Who I Am"
              title="Direct response creative focused on performance"
              description="I manage the full creative process from research to final execution using a structured workflow. I actively use AI tools and trend-based editing approaches to ensure modern, impactful content."
            />
            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="card rounded-2xl p-5"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Skills
                </p>
                <motion.ul
                  className="mt-3 space-y-2 text-sm text-white/80"
                  variants={containerVariants}
                >
                  {skills.map((skill) => (
                    <motion.li key={skill} variants={itemVariants}>
                      â€¢ {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              <motion.div
                className="card rounded-2xl p-5"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Interests
                </p>
                <motion.ul
                  className="mt-3 space-y-2 text-sm text-white/80"
                  variants={containerVariants}
                >
                  {interests.map((interest) => (
                    <motion.li key={interest} variants={itemVariants}>
                      â€¢ {interest}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="card overflow-hidden rounded-[28px] p-2"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <ParallaxImage
              src={aboutImage}
              alt="Harmain Ali portrait"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Workflow Section */}
      <motion.section
        id="workflow"
        className="section min-h-screen flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr] w-full">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeader
              eyebrow="Creative Workflow"
              title="Structured, performance-first process"
              description="A step-by-step workflow designed to ensure every creative is optimized for engagement, retention, and conversions."
            />
            <motion.div
              className="grid gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="card rounded-2xl p-5"
                  variants={itemVariants}
                  whileHover={{ x: 8, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Step {index + 1}
                  </p>
                  <h3 className="font-display mt-2 text-xl text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{step.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="card overflow-hidden rounded-[28px] p-2"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <ParallaxImage
              src={workflowImage}
              alt="Creative workflow workspace"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* AI Tools Section */}
      <motion.section
        className="section-tight min-h-screen flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto max-w-6xl px-4 w-full">
          <SectionHeader
            eyebrow="AI-Enhanced Video Editing"
            title="Modern tool stack for faster, smarter delivery"
            description="Leveraging AI tools to speed up workflow, enhance creativity, and improve content quality across voice, visuals, and motion."
          />
          <motion.div
            className="card overflow-hidden rounded-[28px] p-3"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
          >
            <ParallaxImage
              src={aiToolsImage}
              alt="AI tools workflow"
              className="w-full object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Sales Section */}
      <motion.section
        className="section min-h-screen flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr] w-full">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeader
              eyebrow="Sales-Driven Creatives"
              title="Built for conversions, retention, and scale"
              description="Every edit is optimized for performance marketing goals, ensuring the creative drives measurable results."
            />
            <motion.div
              className="card rounded-2xl p-6"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <p className="text-sm text-white/70">
                I focus on attention-grabbing hooks, rapid pacing, and clear
                product storytelling to create ads that keep viewers watching
                and push them to take action. The outcome is content that
                performs, iterates, and scales across platforms.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            className="card overflow-hidden rounded-[28px] p-2"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <ParallaxImage
              src={salesImage}
              alt="Performance target creative"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Work Section */}
      <motion.section
        id="work"
        className="section min-h-screen flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto max-w-6xl px-4 w-full">
          <SectionHeader
            eyebrow="Featured Work"
            title="High-converting creatives"
            description="A curated selection of direct response edits designed to drive performance."
          />
          <motion.div
            className="video-reel"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredVideos.map((video) => (
              <motion.article
                key={video.title}
                className="card video-slide rounded-2xl p-2"
                variants={itemVariants}
                whileHover={{ y: -12 }}
              >
                <div className="video-frame overflow-hidden rounded-2xl">
                  {video.file ? (
                    <video
                      className="portfolio-video"
                      autoPlay
                      loop
                      muted
                      preload="metadata"
                      playsInline
                      aria-label={video.title}
                    >
                      <source src={video.file} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="video-placeholder">
                      <span>Add Cloudinary link</span>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Explore More Section */}
      <motion.section
        id="explore"
        className="section-tight min-h-screen flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto max-w-6xl px-4 w-full">
          <motion.div
            className="card flex flex-col items-start justify-between gap-6 rounded-[28px] p-8 md:flex-row md:items-center"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.p
                className="text-xs uppercase tracking-[0.3em] text-white/50"
                variants={itemVariants}
              >
                Explore More
              </motion.p>
              <motion.h3
                className="font-display mt-2 text-2xl text-white"
                variants={itemVariants}
              >
                Dive into additional edits and ad angles
              </motion.h3>
            </motion.div>
            <motion.a
              href="#examples"
              className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white hover:border-white/40 transition-colors"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More Work
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* More Examples Section */}
      <motion.section
        id="examples"
        className="section min-h-screen flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto max-w-6xl px-4 w-full">
          <SectionHeader
            eyebrow="Further Examples"
            title="More performance-driven edits"
            description="Additional creatives showcasing a range of hooks, formats, and ad angles."
          />
          <motion.div
            className="video-reel"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {moreVideos.map((video) => (
              <motion.article
                key={video.title}
                className="card video-slide rounded-2xl p-2"
                variants={itemVariants}
                whileHover={{ y: -12 }}
              >
                <div className="video-frame overflow-hidden rounded-2xl">
                  {video.file ? (
                    <video
                      className="portfolio-video"
                      autoPlay
                      loop
                      muted
                      preload="metadata"
                      playsInline
                      aria-label={video.title}
                    >
                      <source src={video.file} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="video-placeholder">
                      <span>Add Cloudinary link</span>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        className="section min-h-screen flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto max-w-6xl px-4 w-full">
          <SectionHeader
            eyebrow="Experience Working With Me"
            title="Creative partner focused on results"
            description="What you can expect when collaborating on direct response campaigns."
          />
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {experienceCards.map((card) => (
              <motion.article
                key={card.title}
                className="card rounded-2xl p-6"
                variants={itemVariants}
                whileHover={{ y: -12, rotateZ: 2 }}
              >
                <h3 className="font-display text-xl text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-white/70">{card.detail}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="section min-h-screen flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto max-w-6xl px-4 w-full">
          <motion.div
            className="card rounded-[28px] p-10 md:p-14"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionHeader
              eyebrow="Let&apos;s Connect"
              title="Ready to scale your next campaign"
              description="Reach out to start a project, discuss creative strategy, or request a tailored ad package."
            />
            <motion.div
              className="grid gap-6 text-sm text-white/70 md:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Email
                </p>
                <motion.a
                  href="mailto:harmainali1503@gmail.com"
                  className="mt-2 block text-lg text-white hover:text-accent transition-colors"
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  harmainali1503@gmail.com
                </motion.a>
              </motion.div>
              <motion.div variants={itemVariants}>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  WhatsApp
                </p>
                <motion.a
                  href="tel:+933122129751"
                  className="mt-2 block text-lg text-white hover:text-accent transition-colors"
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  +93 312 212 9751
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
