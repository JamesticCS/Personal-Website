'use client'

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { experiences } from '@/content/experience'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ExperienceClient() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="vertical-timeline-custom-container w-full">
        <VerticalTimeline 
          lineColor="#10b981" 
          className="vertical-timeline"
          animate={true}
        >
          {experiences.map((exp, idx) => (
            <VerticalTimelineElement
              key={idx}
              date={exp.period}
              dateClassName="text-gray-400 md:text-lg"
              iconStyle={{ background: exp.color || '#10b981', color: '#fff' }}
              contentStyle={{
                background: 'rgb(20,20,23)',
                color: '#fff',
                boxShadow: `0 4px 16px ${exp.color}20`,
                border: `1px solid ${exp.color}30`
              }}
              contentArrowStyle={{ borderRight: `7px solid ${exp.color}30` }}
              icon={<div></div>}
            >
              <div className="flex justify-between items-center">
                <div className="max-w-sm">
                  <h3 className="font-semibold text-xl">{exp.company}</h3>
                  <h4 className="text-sm text-primary">{exp.position}</h4>
                  <p className="text-xs text-gray-400 mt-1 italic">{exp.location}</p>
                </div>
                <div className="w-28 h-28 relative hidden sm:flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full" style={{ backgroundColor: exp.color + '20' }}></div>
                  <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center z-10"
                      style={{ backgroundColor: exp.color + '15' }}>
                    {exp.logoUrl && (
                      <Image
                        src={exp.logoUrl}
                        alt={`${exp.company} logo`}
                        width={90}
                        height={90}
                        className="object-contain max-w-full"
                        priority
                      />
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-300">{exp.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  )
}

