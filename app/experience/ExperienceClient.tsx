'use client'

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { experiences } from '@/content/experience'

export default function ExperienceClient() {
  return (
    <section className="py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Experience</h1>
      <VerticalTimeline lineColor="#7e5bff">
        {experiences.map((exp, idx) => (
          <VerticalTimelineElement
            key={idx}
            date={exp.period}
            iconStyle={{ background: '#7e5bff', color: '#fff' }}
            contentStyle={{ background: 'rgb(20,20,23)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid rgb(20,20,23)' }}
          >
            <h3 className="font-semibold">{exp.company}</h3>
            <h4 className="text-sm text-gray-400">{exp.position}</h4>
            <p className="mt-2 text-sm">{exp.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  )
}

