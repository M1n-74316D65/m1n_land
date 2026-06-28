import {
  Github,
  AtSign,
  Rss,
  CircleUserRound,
  BookOpenText,
  LockKeyhole,
  Terminal,
  Circle,
  LayoutTemplate,
  Code,
  FolderCog,
  LayoutDashboard,
} from 'lucide-react'

export const navItems = [
  { path: '/', name: 'home' },
  { path: '/projects', name: 'projects' },
  { path: 'https://journal.m1n.land', name: 'blog' },
  { path: '/radio', name: 'radio' },
] as const

export const techStack = ['Rust', 'Go', 'TypeScript', 'Linux', 'Neovim'] as const

export const projects = [
  {
    href: 'https://links.m1n.land/miraviewer',
    icon: LayoutDashboard,
    label: 'Miraviewer',
    description: 'All-in-one dashboard for managing sales, invoices, and reports.',
    category: 'Projects',
    tags: ['Go', 'Web'],
  },
  {
    href: 'https://links.m1n.land/pastol',
    icon: Terminal,
    label: 'Pastol',
    description: 'Command-line interface for paste.lol.',
    category: 'Projects',
    tags: ['Rust', 'CLI'],
  },
  {
    href: 'https://links.m1n.land/rusted-yadm',
    icon: FolderCog,
    label: 'rusted-yadm',
    description: 'A command-line dotfile manager written in Rust.',
    category: 'Projects',
    tags: ['Rust', 'CLI'],
  },
  {
    href: 'https://links.m1n.land/rustlesspass',
    icon: LockKeyhole,
    label: 'RustedLessPass',
    description: 'Stateless password manager - one master password, no sync needed.',
    category: 'Projects',
    tags: ['Rust', 'Security'],
  },
  {
    href: 'https://links.m1n.land/sourcehut-profile',
    icon: Circle,
    label: 'SourceHut',
    category: 'Projects',
  },
  {
    href: 'https://links.m1n.land/github-profile',
    icon: Github,
    label: 'GitHub',
    category: 'Projects',
  },
] as const

export const socialLinks = [
  {
    href: 'https://m1n.omg.lol',
    icon: CircleUserRound,
    label: 'Profile',
    category: 'Connect',
  },
  {
    href: 'mailto:public@m1n.land',
    icon: AtSign,
    label: 'Email',
    category: 'Connect',
  },
  {
    href: 'https://links.m1n.land/goodreads',
    icon: BookOpenText,
    label: 'Goodreads',
    category: 'Connect',
  },
] as const

export const externalLinks = [
  {
    href: 'https://journal.m1n.land/atom.xml',
    icon: Rss,
    label: 'RSS',
    category: 'Links',
  },
  {
    href: 'https://links.m1n.land/nextjs-portfolio',
    icon: Code,
    label: 'Source',
    category: 'Links',
  },
  {
    href: 'http://start.m1n.land',
    icon: LayoutTemplate,
    label: 'Startpage',
    category: 'Links',
  },
] as const

export const featuredProjects = [projects[0], projects[1], projects[2], projects[3]] as const

export const homeFeaturedProjects = [projects[0], projects[1]] as const

export const allLinks = [
  ...navItems.map((n) => ({ href: n.path, label: n.name })),
  ...projects.map((p) => ({ href: p.href, label: p.label })),
  ...socialLinks.map((s) => ({ href: s.href, label: s.label })),
  ...externalLinks.map((e) => ({ href: e.href, label: e.label })),
] as const

export type NavItem = (typeof navItems)[number]
export type Project = (typeof projects)[number]
export type SocialLink = (typeof socialLinks)[number]
export type ExternalLink = (typeof externalLinks)[number]
export type LinkItem = { href: string; icon: React.ElementType; label: string }
