'use client';

import { Container, Title, Text, Button, Group, Stack, Box, SimpleGrid, ThemeIcon, Paper, Badge } from '@mantine/core';
import { ArrowRight, Github, Shield, Users, BarChart3, Clock, TrendingUp, CheckCircle2, Star, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  const features = [
    {
      icon: Users,
      title: 'Team Management',
      description: 'Easily manage your team members, assign tasks, and track individual performance metrics.',
      color: 'indigo'
    },
    {
      icon: CheckCircle2,
      title: 'Task Tracking',
      description: 'Effortlessly manage tasks, assign responsibilities, and track progress in real-time.',
      color: 'teal'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Get insights into team productivity with comprehensive analytics and reporting tools.',
      color: 'violet'
    },
    {
      icon: Clock,
      title: 'Status Management',
      description: 'Track task statuses (Pending, In Progress, Completed) with intuitive visual indicators.',
      color: 'orange'
    },
    {
      icon: TrendingUp,
      title: 'Performance Metrics',
      description: 'Monitor completion rates, productivity scores, and identify top performers.',
      color: 'pink'
    },
    {
      icon: Shield,
      title: 'Data Persistence',
      description: 'All your data is securely stored locally and persists across browser sessions.',
      color: 'blue'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Teams' },
    { value: '50K+', label: 'Tasks Managed' },
    { value: '99%', label: 'Uptime' },
    { value: '4.9/5', label: 'User Rating' }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20 },
    visible: { y: 0 }
  };


  return (
    <Box style={{ overflow: 'hidden', position: 'relative', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #581c87 75%, #7c2d12 100%)',
        }}
      >
        {/* Simple Background Elements */}
        <motion.div
          animate={{ 
            scale: [0.8, 1, 0.8],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />
        <motion.div
          animate={{ 
            scale: [0.8, 1.1, 0.8],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />
        
        <Container size="xl" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Stack gap="xl" py={{ base: 60, md: 100 }} align="center" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <motion.div variants={itemVariants}>
                <Badge
                  size="lg"
                  variant="light"
                  color="white"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                  }}
                >
                  <Group gap={4}>
                    <Star size={14} fill="white" />
                    <Text size="sm" fw={600}>Trusted by 10,000+ teams worldwide</Text>
                  </Group>
                </Badge>
              </motion.div>

                <motion.div variants={itemVariants}>
                  <Title 
                    order={1} 
                    ta="center" 
                    c="white"
                    style={{ 
                      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                      lineHeight: 1.1,
                      fontWeight: 900,
                      letterSpacing: '-2px',
                      textShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}
                  >
                    The Task Management Platform
                    <br />
                    <Text
                      component="span"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Your Team Actually Wants to Use
                    </Text>
                  </Title>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Text 
                    c="white" 
                    size="xl" 
                    ta="center"
                    opacity={0.95}
                    style={{
                      fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                      lineHeight: 1.7,
                      fontWeight: 400,
                    }}
                  >
                    Streamline workflows, boost productivity, and keep your team aligned. 
                    Built for modern teams who value simplicity and efficiency.
                  </Text>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Group gap="md" mt="xl" wrap="wrap" justify="center">
                    <Button 
                      size="lg" 
                      component={Link}
                      href="/login"
                      rightSection={<ArrowRight size={20} />}
                      variant="gradient"
                      gradient={{ from: 'white', to: 'rgba(255,255,255,0.9)' }}
                      c="indigo"
                      radius="md"
                      style={{
                        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                        padding: '0 40px',
                        height: '56px',
                        fontWeight: 600,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                      }}
                    >
                      Get Started Free
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      leftSection={<Play size={18} />}
                      radius="md"
                      style={{
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.4)',
                        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                        padding: '0 40px',
                        height: '56px',
                        fontWeight: 600,
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Group>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Text size="xs" c="white" opacity={0.8} mt="md">
                    No credit card required • Free forever • Setup in 2 minutes
                  </Text>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                  variants={itemVariants}
                  style={{ width: '100%', marginTop: '2rem' }}
                >
                  <SimpleGrid cols={4} spacing="xl">
                    {stats.map((stat, index) => (
                      <Stack key={index} align="center" gap={4}>
                      <Text
                        c="white"
                        fw={800}
                        style={{
                            fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                          lineHeight: 1,
                        }}
                      >
                        {stat.value}
                      </Text>
                      <Text size="sm" c="white" opacity={0.9}>
                        {stat.label}
                      </Text>
                    </Stack>
                  ))}
                </SimpleGrid>
              </motion.div>
            </Stack>

          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box style={{ backgroundColor: 'var(--mantine-color-body)', paddingTop: '100px', paddingBottom: '100px' }}>
        <Container size="xl" px={{ base: 12, sm: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <Stack align="center" gap="xl" mb="xl">
              <Badge size="lg" variant="light" color="indigo" mb="xs">
                Features
              </Badge>
              <Title order={2} size="h1" ta="center" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-1.5px', fontWeight: 800 }}>
                Everything you need to
                <br />
                <Text
                  component="span"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'violet' }}
                  inherit
                >
                  manage your team
                </Text>
              </Title>
              <Text c="dimmed" size="lg" ta="center" maw={700} style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                Powerful features designed to help your team work smarter, not harder. 
                Built with modern technology and user experience in mind.
              </Text>
            </Stack>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 'md', md: 'xl' }}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    p={{ base: 'lg', md: 'xl' }}
                    radius="lg"
                    className="glass-card"
                    style={{ height: '100%', transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Stack gap="md">
                      <ThemeIcon 
                        size={64} 
                        radius="md" 
                        variant="light" 
                        color={feature.color}
                        style={{ width: 'fit-content' }}
                      >
                        <feature.icon size={32} />
                      </ThemeIcon>
                      <Title order={3} size="h4" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', fontWeight: 700 }}>
                        {feature.title}
                      </Title>
                      <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>
                        {feature.description}
                      </Text>
                    </Stack>
                  </Paper>
                </motion.div>
              ))}
            </SimpleGrid>
          </motion.div>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box style={{ backgroundColor: 'var(--mantine-color-body)', paddingTop: '80px', paddingBottom: '80px' }}>
        <Container size="xl" px={{ base: 12, sm: 20 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 'xl', md: '60px' }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Stack gap="lg">
                <Badge size="lg" variant="light" color="indigo" w="fit-content">
                  Why Choose Us
                </Badge>
                <Title order={2} size="h1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-1px', fontWeight: 800 }}>
                  Built for teams who
                  <br />
                  <Text
                    component="span"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'violet' }}
                    inherit
                  >
                    value their time
                  </Text>
                </Title>
                <Text size="lg" c="dimmed" style={{ lineHeight: 1.7 }}>
                  Stop wasting time on complicated tools. TaskTracker is designed to be intuitive, 
                  fast, and powerful—without the learning curve.
                </Text>
                <Stack gap="md" mt="md">
                  {[
                    'Real-time collaboration and updates',
                    'Intuitive drag-and-drop interface',
                    'Comprehensive analytics and insights',
                    'Secure local data storage',
                    'Works offline and syncs automatically',
                    'Beautiful, modern interface'
                  ].map((item, index) => (
                    <Group key={index} gap="sm" align="flex-start">
                      <ThemeIcon size={24} radius="md" variant="light" color="teal">
                        <CheckCircle2 size={16} />
                      </ThemeIcon>
                      <Text size="md" style={{ flex: 1 }}>{item}</Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                p="xl"
                radius="xl"
                className="glass-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
                  border: '2px solid rgba(79, 70, 229, 0.1)',
                }}
              >
                <Stack gap="lg">
                  <SimpleGrid cols={2} spacing="md">
                    <Paper p="md" radius="md" style={{ background: 'rgba(79, 70, 229, 0.05)' }}>
                      <Stack gap="xs" align="center">
                        <Text fw={800} size="2rem" c="indigo">20+</Text>
                        <Text size="xs" c="dimmed" ta="center">Team Members</Text>
                      </Stack>
                    </Paper>
                    <Paper p="md" radius="md" style={{ background: 'rgba(124, 58, 237, 0.05)' }}>
                      <Stack gap="xs" align="center">
                        <Text fw={800} size="2rem" c="violet">40+</Text>
                        <Text size="xs" c="dimmed" ta="center">Active Tasks</Text>
                      </Stack>
                    </Paper>
                    <Paper p="md" radius="md" style={{ background: 'rgba(20, 184, 166, 0.05)' }}>
                      <Stack gap="xs" align="center">
                        <Text fw={800} size="2rem" c="teal">85%</Text>
                        <Text size="xs" c="dimmed" ta="center">Completion Rate</Text>
                      </Stack>
                    </Paper>
                    <Paper p="md" radius="md" style={{ background: 'rgba(236, 72, 153, 0.05)' }}>
                      <Stack gap="xs" align="center">
                        <Text fw={800} size="2rem" c="pink">92</Text>
                        <Text size="xs" c="dimmed" ta="center">Productivity Score</Text>
                      </Stack>
                    </Paper>
                  </SimpleGrid>
                  <Paper
                    p="md"
                    radius="md"
                    style={{
                      background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                      border: '1px solid rgba(79, 70, 229, 0.2)',
                    }}
                  >
                    <Text size="sm" c="dimmed" ta="center">
                      <Text component="span" fw={700} c="indigo">Live Demo:</Text> See real-time updates as your team collaborates
                    </Text>
                  </Paper>
                </Stack>
              </Paper>
            </motion.div>
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box style={{ backgroundColor: 'var(--mantine-color-body)', paddingTop: '80px', paddingBottom: '100px' }}>
        <Container size="xl" px={{ base: 12, sm: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              p={{ base: 'xl', md: '80px' }}
              radius="xl"
              className="glass-card"
              style={{
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                border: '2px solid rgba(79, 70, 229, 0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-10%',
                  width: '400px',
                  height: '400px',
                  background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(60px)',
                }}
              />
              <Stack align="center" gap="lg" style={{ position: 'relative', zIndex: 1 }}>
                <Title order={2} size="h1" ta="center" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-1px', fontWeight: 800 }}>
                  Ready to transform your
                  <br />
                  <Text
                    component="span"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'violet' }}
                    inherit
                  >
                    team&apos;s productivity?
                  </Text>
                </Title>
                <Text c="dimmed" size="lg" ta="center" maw={700} style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                  Join thousands of teams already using TaskTracker to manage their projects, 
                  track progress, and boost productivity. Get started in minutes.
                </Text>
                <Group gap="md" mt="md" wrap="wrap" justify="center">
                  <Button
                    size="lg"
                    component={Link}
                    href="/login"
                    rightSection={<ArrowRight size={20} />}
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'violet' }}
                    radius="md"
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                      padding: '0 40px',
                      height: '56px',
                      fontWeight: 600,
                      boxShadow: '0 10px 40px rgba(79, 70, 229, 0.4)',
                    }}
                    className="hover:translate-y-[-2px]"
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    leftSection={<Github size={18} />}
                    onClick={() => window.open('https://github.com', '_blank')}
                    radius="md"
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                      padding: '0 40px',
                      height: '56px',
                      fontWeight: 600,
                    }}
                  >
                    View on GitHub
                  </Button>
                </Group>
                <Text size="xs" c="dimmed" mt="md">
                  <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  No credit card required • Free forever • Setup in 2 minutes
                </Text>
              </Stack>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
