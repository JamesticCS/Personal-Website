'use client';

import { motion } from 'framer-motion';

type Skill = {
  name: string;
  level: number;
};

type SkillCategory = {
  category: string;
  items: Skill[];
};

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full"
    >
      <h1 className="mb-4 text-center text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent inline-block mx-auto">
        Skills
      </h1>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
        Technologies and tools I specialize in and use regularly in my projects.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {skills.map((category) => (
          <motion.div 
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-xl bg-surface p-6 border border-gray-800"
          >
            <h3 className="text-xl font-medium text-gray-200 mb-4">{category.category}</h3>
            <div className="space-y-4">
              {category.items.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-xs text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}