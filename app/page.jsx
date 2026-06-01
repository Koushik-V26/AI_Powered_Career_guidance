'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Target, TrendingUp, Users, ArrowRight, Star, CheckCircle } from 'lucide-react'
import DomainGrid from '../components/DomainGrid'
import Chatbot from '../components/Chatbot' // Import the new component

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setIsVisible(true)
    // Check for logged in user
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Guidance',
      description: 'Get personalized career recommendations based on your skills, interests, and goals.'
    },
    {
      icon: Target,
      title: 'Tailored Roadmaps',
      description: 'Receive step-by-step career roadmaps customized to your domain and experience level.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your skill development and career progression with advanced analytics.'
    },
    {
      icon: Users,
      title: '24/7 AI Mentor',
      description: 'Get instant support and motivation from your personal AI career mentor.'
    }
  ]

  const testimonials = [
    {
      name: 'Chatresh Konchada',
      domain: 'Data Science',
      text: 'This app transformed my career path from confusion to clarity. The AI recommendations were spot-on!',
      rating: 5
    },
    {
      name: 'Vinay Ram',
      domain: 'AI/ML Engineer',
      text: 'The personalized roadmap helped me transition from commerce to tech in just 8 months.',
      rating: 4
    },
    {
      name: 'Pavan Teja',
      domain: 'Doctor',
      text: 'Finally found my passion in medicine through the comprehensive assessment and guidance.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your AI-Powered
              <span className="block text-yellow-300">Career Navigator</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover your perfect career path with personalized AI guidance, tailored roadmaps, 
              and continuous mentorship across all domains.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {currentUser ? (
              // Show different CTA for logged in users
              <>
                <Link 
                  href="/assessment" 
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                >
                  Take Assessment <ArrowRight size={20} />
                </Link>
                <Link 
                  href="/dashboard" 
                  className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900"
                >
                  View Dashboard
                </Link>
              </>
            ) : (
              // Show auth CTA for non-logged in users
              <>
                <Link 
                  href="/auth" 
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                >
                  Get Started <ArrowRight size={20} />
                </Link>
                <Link 
                  href="#features" 
                  className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900"
                >
                  Learn More
                </Link>
              </>
            )}
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-pulse">
          <div className="w-20 h-20 bg-yellow-400 rounded-full opacity-20"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce">
          <div className="w-16 h-16 bg-purple-400 rounded-full opacity-30"></div>
        </div>
      </section>

      {/* Domain Selection - Only show for logged in users */}
      {currentUser && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              
            </motion.div>
            <DomainGrid />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of career guidance with our AI-powered features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 text-center hover:shadow-2xl"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to transform your career journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: currentUser ? 'Complete Assessment' : 'Sign Up & Complete Profile',
                description: currentUser 
                  ? 'Answer questions about your background, interests, and goals to help our AI understand you better.'
                  : 'Create your account and tell us about your background, interests, and career goals.'
              },
              {
                step: '02',
                title: 'Get AI Analysis',
                description: 'Our AI analyzes your profile and matches you with the most suitable career paths and opportunities.'
              },
              {
                step: '03',
                title: 'Follow Your Roadmap',
                description: 'Receive a personalized learning roadmap and track your progress with continuous AI mentorship.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {item.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ArrowRight className="text-gray-300 mx-auto" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real people, real transformations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.domain}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of professionals who have discovered their perfect career path with AI guidance.
            </p>
            {currentUser ? (
              <Link 
                href="/assessment" 
                className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900"
              >
                Start Assessment <ArrowRight size={20} />
              </Link>
            ) : (
              <Link 
                href="/auth" 
                className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900"
              >
                Get Started Now <ArrowRight size={20} />
              </Link>
            )}
          </motion.div>
        </div>
      </section>
      
      <Chatbot />
    </div>
  )
}