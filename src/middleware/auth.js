// Authentication middleware
export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  
  // Redirect to login page or send 401 for API
  if (req.path.startsWith('/api')) {
    return res.status(401).json({ 
      success: false, 
      error: 'Authentication required' 
    });
  }
  
  // For web pages, redirect to home with message
  return res.redirect('/?error=login_required');
};

// Check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  
  if (req.path.startsWith('/api')) {
    return res.status(403).json({ 
      success: false, 
      error: 'Admin access required' 
    });
  }
  
  return res.redirect('/?error=admin_required');
};

// Logging middleware
export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
};

// Error handling for async routes
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
