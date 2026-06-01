import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Career Guidance - Your Personalized Career Navigator',
  description: 'Get AI-powered career guidance tailored to your domain, skills, and goals. Navigate your career path with personalized roadmaps and mentorship.',
  keywords: 'career guidance, AI mentor, career path, skill development, professional growth',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}