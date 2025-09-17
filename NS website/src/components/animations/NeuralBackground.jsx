import React, { useEffect, useRef } from 'react'

const NeuralBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const nodesRef = useRef([])
  const connectionsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Resize canvas to fit screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialize neural network
    const initNetwork = () => {
      nodesRef.current = []
      connectionsRef.current = []
      
      const nodeCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))
      
      // Create nodes
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          pulsePhase: Math.random() * Math.PI * 2
        })
      }
    }

    // Update connections between nodes
    const updateConnections = () => {
      connectionsRef.current = []
      const maxDistance = 120

      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const dx = nodesRef.current[i].x - nodesRef.current[j].x
          const dy = nodesRef.current[i].y - nodesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            connectionsRef.current.push({
              node1: nodesRef.current[i],
              node2: nodesRef.current[j],
              distance: distance,
              opacity: (maxDistance - distance) / maxDistance
            })
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections with golden gradients
      connectionsRef.current.forEach(connection => {
        const gradient = ctx.createLinearGradient(
          connection.node1.x, connection.node1.y,
          connection.node2.x, connection.node2.y
        )
        gradient.addColorStop(0, `rgba(255, 215, 0, ${connection.opacity * 0.3})`)
        gradient.addColorStop(0.5, `rgba(244, 196, 48, ${connection.opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(218, 165, 32, ${connection.opacity * 0.3})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = connection.opacity * 2
        ctx.beginPath()
        ctx.moveTo(connection.node1.x, connection.node1.y)
        ctx.lineTo(connection.node2.x, connection.node2.y)
        ctx.stroke()
      })

      // Update and draw nodes
      nodesRef.current.forEach(node => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off walls
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))

        // Update pulse phase
        node.pulsePhase += 0.02
        const pulseScale = 1 + Math.sin(node.pulsePhase) * 0.3

        // Draw node with golden glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * pulseScale * 3
        )
        gradient.addColorStop(0, `rgba(255, 215, 0, ${node.opacity})`)
        gradient.addColorStop(0.7, `rgba(255, 215, 0, ${node.opacity * 0.3})`)
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * pulseScale * 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw golden core
        ctx.fillStyle = `rgba(255, 215, 0, ${node.opacity})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2)
        ctx.fill()
      })

      // Update connections periodically for performance
      if (Math.random() < 0.1) {
        updateConnections()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    initNetwork()
    updateConnections()
    animate()

    // Handle window resize
    const handleResize = () => {
      resizeCanvas()
      initNetwork()
      updateConnections()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)'
      }}
    />
  )
}

export default NeuralBackground