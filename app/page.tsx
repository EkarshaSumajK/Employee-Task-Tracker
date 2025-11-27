'use client';

import { Container, Title, Text, Button, Group, Stack, Box, SimpleGrid, ThemeIcon, Paper } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { ArrowRight, Github, CheckCircle2, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance, ensuring your team stays productive without delays.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security to keep your sensitive data safe and protected at all times.'
    },
    {
      icon: CheckCircle2,
      title: 'Task Tracking',
      description: 'Effortlessly manage tasks, assign responsibilities, and track progress in real-time.'
    }
  ];

  return (
    <Box style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Hero Section */}
      <Box
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Decorative Background Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '50vw',
            height: '50vw',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        
        <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
          <Stack align="center" gap="xl" py={{ base: 60, md: 100 }}>
            {/* Logo/Icon Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box
                className="glass-card"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem'
                }}
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11L12 14L22 4" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Box>
            </motion.div>

            <Stack align="center" gap="md" style={{ maxWidth: 800 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Title 
                  order={1} 
                  ta="center" 
                  c="white"
                  style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    lineHeight: 1.1,
                    fontWeight: 800,
                    textShadow: '0 4px 20px rgba(0,0,0,0.2)'
                  }}
                >
                  Employee Task Tracker
                </Title>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Text 
                  c="white" 
                  size="xl" 
                  ta="center" 
                  maw={700}
                  opacity={0.9}
                  style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    lineHeight: 1.6,
                  }}
                >
                  Streamline your workflow, boost productivity, and keep your team aligned with our modern task management solution.
                </Text>
              </motion.div>
            </Stack>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Group gap="md" mt="xl">
                <Button 
                  size="xl" 
                  onClick={() => router.push('/login')}
                  rightSection={<ArrowRight size={20} />}
                  style={{
                    background: 'white',
                    color: '#4F46E5',
                    fontSize: '1.1rem',
                    padding: '0 40px',
                    height: '60px',
                    fontWeight: 600,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    border: 'none',
                    transition: 'transform 0.2s'
                  }}
                  className="hover:translate-y-[-2px]"
                >
                  Get Started
                </Button>
                <Button 
                  size="xl" 
                  variant="outline"
                  onClick={() => window.open('https://github.com', '_blank')}
                  leftSection={<Github size={20} />}
                  style={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.4)',
                    fontSize: '1.1rem',
                    padding: '0 40px',
                    height: '60px',
                    fontWeight: 600,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  View Source
                </Button>
              </Group>
            </motion.div>

            {/* Stats / Features Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ width: '100%', marginTop: '4rem' }}
            >
              <SimpleGrid cols={{ base: 1, md: 3 }} spacing={30}>
                {features.map((feature, index) => (
                  <Paper
                    key={index}
                    p="xl"
                    radius="lg"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white'
                    }}
                  >
                    <ThemeIcon 
                      size={48} 
                      radius="md" 
                      variant="light" 
                      color="white"
                      style={{ background: 'rgba(255,255,255,0.2)' }}
                      mb="md"
                    >
                      <feature.icon size={24} color="white" />
                    </ThemeIcon>
                    <Text size="xl" fw={700} mb="xs">{feature.title}</Text>
                    <Text size="sm" opacity={0.8} style={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Text>
                  </Paper>
                ))}
              </SimpleGrid>
            </motion.div>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
