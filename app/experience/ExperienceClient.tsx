'use client'

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { experiences } from '@/content/experience'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

export default function ExperienceClient() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0 pointer-events-none"></div>
      <div className="vertical-timeline-custom-container w-full">
        <VerticalTimeline 
          lineColor="#7e5bff" 
          className="vertical-timeline"
          animate={true}
        >
          {experiences.map((exp, idx) => (
            <VerticalTimelineElement
              key={idx}
              date={exp.period}
              dateClassName="text-gray-400 md:text-lg"
              iconStyle={{ background: '#7e5bff', color: '#fff' }}
              contentStyle={{ 
                background: 'rgb(20,20,23)', 
                color: '#fff',
                boxShadow: '0 4px 16px rgba(126, 91, 255, 0.1)',
                border: '1px solid rgba(126, 91, 255, 0.2)'
              }}
              contentArrowStyle={{ borderRight: '7px solid rgba(126, 91, 255, 0.2)' }}
              icon={<Briefcase size={18} />}
            >
              <h3 className="font-semibold text-xl">{exp.company}</h3>
              <h4 className="text-sm text-primary">{exp.position}</h4>
              <p className="mt-3 text-sm text-gray-300">{exp.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  )
}

