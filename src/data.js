// ---- Images from src/assets ----
import heroImg from './assets/quilia-zFSo6bnZJTw-unsplash.jpg'
import campusImg from './assets/erika-fletcher-MZxqc6n9qCw-unsplash.jpg'
import kidsOutdoorImg from './assets/note-thanun-CYlPykF-qAM-unsplash.jpg'
import kidsDrawingImg from './assets/cdc-GDokEYnOfnE-unsplash.jpg'
import appleBooksImg from './assets/element5-digital-OyCl7Y4y0Bk-unsplash.jpg'
import classroomImg from './assets/ivan-aleksic-PDRFeeDniCk-unsplash.jpg'
import booksColorImg from './assets/kai-muro-QlJWx2BYeUw-unsplash.jpg'
import bookshelfImg from './assets/kellen-riggin-QUFZr_H2fow-unsplash.jpg'
import bookStackImg from './assets/kimberly-farmer-lUaaKCUANVI-unsplash.jpg'
import examHallImg from './assets/mche-lee-PC91Jm1DlWA-unsplash.jpg'
import libraryImg from './assets/susan-q-yin-2JIvboGLeho-unsplash.jpg'

export const images = {
  hero: heroImg,
  campus: campusImg,
  cta: bookStackImg,
  about: kidsDrawingImg,
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Performance', href: '#performance' },
  {
    label: 'About',
    href: '#about',
    children: [
      { label: 'What Drives Us', href: '#about' },
      { label: 'School Life', href: '#life' },
      { label: 'Admissions', href: '#admissions' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

export const pillars = [
  {
    tone: 'red',
    title: 'Methodology',
    text: 'We are a multi-cultural school that upholds strong Christian values. Our commitment to developing leadership, teamwork and offering quality education is unwavering.',
  },
  {
    tone: 'blue',
    title: 'Environment',
    text: 'Our rich history, strong school culture, and ethos allow all children irrespective of their diversity and backgrounds an opportunity to be open, express and grow in confidence.',
  },
  {
    tone: 'red',
    title: 'Location',
    text: 'Mt. Elgon Academy is located in Central Trans Nzoia, in or near Kitale Town, Saboti Constituency, Trans Nzoia County — easily accessible for day scholars and families.',
  },
  {
    tone: 'blue',
    title: 'Facilities',
    text: 'Mt. Elgon Academy offers modern academic, boarding, and recreational facilities to support holistic development.',
  },
  {
    tone: 'red',
    title: 'Landscape',
    text: 'Named after the majestic Mt Elgon, our school sits in the scenic Trans Nzoia highlands between the peaks of Mt Elgon and the Cherangani Hills.',
  },
]

export const lifeCards = [
  {
    tone: 'blue',
    title: 'Academics',
    text: 'Rigorous academic programs with modern ICT facilities and a well-stocked library to support learning excellence.',
    image: libraryImg,
  },
  {
    tone: 'red',
    title: 'Extra Curricular',
    text: 'Diverse sporting activities and clubs that develop teamwork, leadership, and physical fitness.',
    image: kidsOutdoorImg,
  },
  {
    tone: 'navy',
    title: 'Boarding',
    text: 'Comfortable accommodation with excellent catering services in a home-away-from-home environment.',
    image: campusImg,
  },
]

export const programs = [
  {
    tone: 'red',
    title: 'Early Years',
    ages: 'Ages 3-6',
    text: 'A nurturing foundation where young minds begin their educational journey through play-based learning.',
    points: ['Play-based curriculum', 'Social development', 'Early literacy & numeracy'],
    image: appleBooksImg,
  },
  {
    tone: 'blue',
    title: 'Junior School',
    ages: 'Ages 7-10',
    text: 'Building strong academic foundations while developing critical thinking and creativity.',
    points: ['Core subjects mastery', 'Creative arts', 'Physical education'],
    image: kidsDrawingImg,
    featured: true,
  },
  {
    tone: 'navy',
    title: 'Upper School',
    ages: 'Ages 11-14',
    text: 'Preparing students for secondary education with advanced academics and leadership skills.',
    points: ['Advanced curriculum', 'Leadership programs', 'Career guidance'],
    image: classroomImg,
  },
]

export const facilities = [
  { title: 'Library', text: 'Thousands of titles to spark a lifelong love of reading.', image: bookshelfImg, span: 'tall' },
  { title: 'ICT Lab', text: 'Hands-on digital literacy from the early grades.', image: booksColorImg },
  { title: 'Classrooms', text: 'Bright, spacious and well-ventilated learning spaces.', image: examHallImg },
  { title: 'Dining', text: 'Balanced, nutritious meals prepared fresh daily.', image: classroomImg, span: 'wide' },
]

export const extras = [
  { label: 'School Transport' },
  { label: 'Music & Drama' },
  { label: 'Sports Fields' },
  { label: 'Green Grounds' },
]

export const stats = [
  { value: 98, suffix: '%', label: 'Transition to top secondary schools' },
  { value: 25, suffix: '+', label: 'Years of nurturing excellence' },
  { value: 600, suffix: '+', label: 'Happy learners enrolled' },
  { value: 15, suffix: ':1', label: 'Learner to teacher ratio' },
]

export const testimonials = [
  {
    quote:
      'Mt. Elgon Academy has given our daughter confidence and a genuine love for learning. The teachers know every child by name.',
    name: 'Grace W.',
    role: 'Parent, Junior School',
  },
  {
    quote:
      'The boarding staff made our son feel at home from day one. His growth in discipline and leadership has been remarkable.',
    name: 'Peter K.',
    role: 'Parent, Upper School',
  },
  {
    quote:
      'A serene environment, strong values and excellent results — everything we wanted for our children in one place.',
    name: 'Mercy A.',
    role: 'Parent, Early Years',
  },
]
