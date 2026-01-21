# 🛒 E-Commerce Product Listing Application

Assignment

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js**: `v22.14.0` or higher
- Package Manager: `npm` 

### Environment Variables
Create a `.env` file at the project root:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

### Installation

# Clone the repository
git clone https://github.com/subramanyaraju1112/ecommerce-frontend.git

# Navigate to project directory
cd ecommerce-frontend

# Install dependencies
npm install


### Run the Application

npm run dev

The application will be available at:
http://localhost:5173

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React.js (Vite)** | JavaScript library with fast build tooling |
| **TypeScript** | Type-safe development |
| **Shadcn UI** | Accessible component library |
| **Tailwind CSS** | Utility-first styling framework |
| **Redux Toolkit** | State management |
| **RTK Query** | API data fetching and caching |
| **React Router DOM** | Client-side routing |
| **Lucide React** | Icon library |
| **DummyJSON** | Mock API provider |

---

##  Design Decisions

### State Management
**Redux Toolkit Query (RTK Query)** was chosen because it:
- Simplifies API data fetching and caching
- Automatically handles loading, error, and success states
- Prevents duplicate network requests
- Scales well for applications with shared global state (filters, pagination)

This approach reduced boilerplate while improving maintainability and performance.

### Component Architecture
- **Feature-driven structure** for better scalability
- **Composition pattern** for reusable components
- **Separation of concerns** between layout, business logic, and presentation

---

## Performance Optimizations

The following optimizations were implemented:

### 1. **Debounced Search (300ms)**
Prevents filtering logic from running on every keystroke, reducing unnecessary re-renders.

### 2. **Throttled Price Slider (100ms)**
Avoids excessive state updates during slider drag interactions.

### 3. **Lazy Image Loading**
Improves initial page load time by loading images on-demand.

### 4. **Skeleton Loaders**
Enhances perceived performance while data loads from API.

### 5. **Pagination (24 products per page)**
Limits DOM rendering for better performance with large datasets.

### 6. **Memoization (useMemo, useCallback)**
Prevents unnecessary recalculations for filters and sorting logic.

---

##  Key Features

###  Advanced Filtering System
- **Multi-select categories** with product counts
- **Dual-handle price range slider** with manual inputs
- **Star rating filter** with visual icons
- **Stock status filtering** (In Stock, Low Stock, Out of Stock)
- **Brand filtering** with search and product counts
- **Active filter badges** with individual removal
- **Clear all filters** functionality

### Product Display
- Responsive grid layout (1-4 columns based on screen size)
- Product cards with images, ratings, and pricing
- Quick view and comparison features
- Pagination controls

### Smart Search
- Real-time product search with debouncing
- Search across product names and descriptions
- Clear search functionality

### Accessibility Features
- **Keyboard Navigation**
  - Tab navigation across all interactive elements
  - Arrow keys to navigate product cards
  - Enter key opens product details
  - ESC closes modals
  - `/` focuses search input (GitHub-style)
  - Space toggles compare checkbox
- **Screen Reader Support**
  - Proper ARIA labels throughout
  - Semantic HTML structure
  - Focus management in modals
- **Visual Indicators**
  - Clear focus states
  - High contrast ratios
  - Skip-to-content link

###  Responsive Design
- Mobile-first approach
- Breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
- Touch-friendly interactive elements
- Collapsible sidebar on mobile

---

## Architecture Overview

### Folder Structure
Feature-driven architecture for scalability and maintainability:

```
src/
 ├─ components/
 │   ├─ layout/          # Header, Sidebar, MainLayout
 │   ├─ products/        # ProductCard, ProductList, ProductGrid
 │   ├─ filters/         # FilterPanel, PriceSlider, CategoryFilter
 │   ├─ compare/         # CompareModal, CompareButton
 │   └─ ui/              # Shadcn UI components
 ├─ pages/
 │   └─ HomePage.tsx     # Main product listing page
 ├─ redux/
 │   ├─ features/        # Filter slices, product slices
 │   ├─ services/        # RTK Query API services
 │   └─ store.ts         # Redux store configuration
 ├─ types/
 │   └─ index.ts         # TypeScript interfaces and types
 ├─ utils/
 │   └─ helpers.ts       # Utility functions
 ├─ App.tsx
 └─ main.tsx
```

### State Flow

```
┌─────────────────────────────────────────────────┐
│              Global State (Redux)                │
│  • Filters (category, price, rating, etc.)      │
│  • Comparison list                               │
│  • UI state (sidebar, modals)                    │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│           Server State (RTK Query)               │
│  • Product data with caching                     │
│  • Auto-refetching on filter changes             │
│  • Loading/error states                          │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│            Component Local State                 │
│  • Form inputs                                   │
│  • Temporary UI states                           │
│  • Focus management                              │
└─────────────────────────────────────────────────┘
```

---

## 📋 API Integration

### Endpoints Used

Base URL: https://dummyjson.com

GET /products                    # Fetch all products
GET /products/search?q={query}   # Search products
GET /products/category/{name}    # Filter by category
GET /products/{id}              # Get single product
```

### API Features
- Automatic caching with RTK Query
- Optimistic updates
- Error handling with retry logic
- Type-safe API responses

---

##  Known Limitations

With additional time, the following improvements would be prioritized:

- [ ] Dark/Light mode toggle with theme persistence
- [ ] Comprehensive unit and integration testing
- [ ] Virtualized lists for very large datasets (1000+ products)
- [ ] Persist filter state using localStorage
- [ ] Product comparison persistence across sessions
- [ ] Advanced sorting options (newest, popular, discounted)
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Cart functionality

---

## Development Timeline

| Task | Time Spent |
|------|-----------|
| Project setup, libraries, folder structure | 30 min |
| Component architecture and layouts | 1 hour |
| Filter system implementation | 1.5 hours |
| API integration with RTK Query | 45 min |
| Responsive design and mobile optimization | 1 hour |
| Accessibility features | 45 min |
| Performance optimizations | 30 min |
| Testing and bug fixes | 30 min |
| Documentation | 20 min |
| **Total** | **~6 hours** |

---