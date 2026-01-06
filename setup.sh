#!/bin/bash

# ECC App Setup Script
# This script will setup the entire application

echo "🚀 Setting up ECC Fullstack Application..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "🐳 Docker detected. Starting PostgreSQL container..."
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo "✅ PostgreSQL container started"
        echo "⏳ Waiting for database to be ready..."
        sleep 5
    else
        echo "⚠️  Failed to start Docker container. Please start PostgreSQL manually."
    fi
else
    echo "⚠️  Docker not found. Please ensure PostgreSQL is running manually."
fi

echo ""

# Push schema to database or run migrations
echo "🗄️  Setting up database schema..."
echo "Generating migrations..."
npm run db:generate

if [ $? -eq 0 ]; then
    echo "Running migrations..."
    npm run db:migrate
else
    echo "⚠️  Migration generation failed, trying direct push..."
    npm run db:push
fi

if [ $? -ne 0 ]; then
    echo "❌ Failed to setup database schema"
    echo "Please check your DATABASE_URL in .env file"
    exit 1
fi

echo "✅ Database schema created"
echo ""

# Seed database
read -p "📊 Do you want to seed the database with sample data? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npm run db:seed
    
    if [ $? -eq 0 ]; then
        echo "✅ Database seeded successfully"
    else
        echo "⚠️  Seeding failed, but you can continue"
    fi
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Run 'npm run dev' to start development server"
echo "   2. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Full documentation"
echo "   - QUICKSTART.md - Quick start guide"
echo "   - API_EXAMPLES.md - API usage examples"
echo ""
echo "Happy coding! 🚀"
