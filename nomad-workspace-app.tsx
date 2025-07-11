import React, { useState } from 'react';
import { Search, MapPin, Star, Calendar, Users, Wifi, Coffee, Heart, Filter, User, Plus, MessageCircle, X, Minus } from 'lucide-react';

// Mock data for listings
const mockListings = [
  {
    id: 1,
    title: "Modern Loft + Coworking Space",
    location: "Lisbon, Portugal",
    price: 25,
    rating: 4.8,
    reviews: 42,
    hostName: "Sofia Martinez",
    hostAvatar: "https://images.unsplash.com/photo-1494790108755-2616b9ff3fb4?w=150&h=150&fit=crop&crop=face",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
    ],
    amenities: ["High-speed WiFi", "Standing desk", "Coffee machine", "Balcony"],
    workspaceType: "Dedicated desk",
    sleeps: 2,
    available: true,
    description: "Beautiful loft in the heart of Lisbon with a dedicated coworking area. Perfect for digital nomads who want to experience the city while staying productive.",
    lat: 38.7223,
    lng: -9.1393
  },
  {
    id: 2,
    title: "Beachside Studio + Shared Office",
    location: "Canggu, Bali",
    price: 18,
    rating: 4.9,
    reviews: 67,
    hostName: "Made Wijaya",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop"
    ],
    amenities: ["Beach access", "Shared kitchen", "Yoga space", "Scooter parking"],
    workspaceType: "Shared office",
    sleeps: 1,
    available: true,
    description: "Wake up to ocean views and surf breaks. Shared office space with other nomads and locals. Perfect for the digital nomad lifestyle.",
    lat: -8.6500,
    lng: 115.1400
  },
  {
    id: 3,
    title: "Mountain Cabin + Creative Studio",
    location: "Medellín, Colombia",
    price: 22,
    rating: 4.7,
    reviews: 28,
    hostName: "Carlos Ruiz",
    hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop"
    ],
    amenities: ["Mountain views", "Creative studio", "Fast internet", "Local guides"],
    workspaceType: "Private office",
    sleeps: 2,
    available: true,
    description: "Escape to the mountains while staying connected. Private creative studio with inspiring views of the Andes.",
    lat: 6.2442,
    lng: -75.5812
  }
];

const mockReviews = [
  {
    id: 1,
    listingId: 1,
    guestName: "Alex Thompson",
    guestAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    comment: "Sofia's place was incredible! The workspace setup was perfect for my coding sessions, and the location couldn't be better.",
    date: "2024-12-15"
  },
  {
    id: 2,
    listingId: 2,
    guestName: "Emma Wilson",
    guestAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    comment: "Made is an amazing host! The beachside office was so inspiring, and I got so much work done between surf sessions.",
    date: "2024-12-10"
  }
];

const NomadWorkspaceApp = () => {
  const [currentTab, setCurrentTab] = useState('explore');
  const [selectedListing, setSelectedListing] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [userMode, setUserMode] = useState('guest');
  const [favorites, setFavorites] = useState([]);
  const [bookingDates, setBookingDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(1);

  const toggleFavorite = (listingId) => {
    setFavorites(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  const handleBooking = () => {
    if (!bookingDates.checkIn || !bookingDates.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    alert(`Booking confirmed at ${selectedListing.title}!`);
    setShowBookingModal(false);
  };

  const ListingCard = ({ listing }) => (
    <div 
      className="bg-white rounded-xl mb-4 shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={() => setSelectedListing(listing)}
    >
      <div className="relative">
        <img 
          src={listing.images[0]} 
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <button 
          className="absolute top-3 right-3 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(listing.id);
          }}
        >
          <Heart 
            size={20} 
            color={favorites.includes(listing.id) ? "#ef4444" : "#6b7280"}
            fill={favorites.includes(listing.id) ? "#ef4444" : "none"}
          />
        </button>
        <div className="absolute bottom-3 left-3 bg-black/60 rounded-lg px-2 py-1">
          <span className="text-white text-sm font-medium">${listing.price}/night</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{listing.title}</h3>
        <div className="flex items-center mb-2">
          <MapPin size={14} color="#6b7280" />
          <span className="text-gray-600 ml-1 text-sm">{listing.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star size={14} color="#fbbf24" fill="#fbbf24" />
            <span className="text-gray-900 ml-1 text-sm font-medium">{listing.rating}</span>
            <span className="text-gray-600 ml-1 text-sm">({listing.reviews} reviews)</span>
          </div>
          <div className="flex items-center">
            <Users size={14} color="#6b7280" />
            <span className="text-gray-600 ml-1 text-sm">Sleeps {listing.sleeps}</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-blue-100 rounded-full px-3 py-1">
            <span className="text-blue-800 text-xs font-medium">{listing.workspaceType}</span>
          </div>
          <Wifi size={14} color="#10b981" className="ml-2" />
          <Coffee size={14} color="#8b5cf6" className="ml-1" />
        </div>
      </div>
    </div>
  );

  const ExploreTab = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="bg-white px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
          <button 
            className="bg-blue-600 rounded-full px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
            onClick={() => setUserMode(userMode === 'guest' ? 'host' : 'guest')}
          >
            {userMode === 'guest' ? 'Become a Host' : 'Browse as Guest'}
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-gray-100 rounded-lg px-4 py-3 flex items-center">
            <Search size={20} color="#6b7280" />
            <input
              className="flex-1 ml-3 bg-transparent outline-none text-gray-900 placeholder-gray-500"
              placeholder="Where do you want to work?"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-colors">
            <Filter size={20} color="#6b7280" />
          </button>
        </div>
      </div>
      
      <div className="px-4 py-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Popular Destinations</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {['Lisbon', 'Bali', 'Mexico City', 'Medellín', 'Prague'].map((city) => (
              <button key={city} className="bg-white rounded-lg px-4 py-2 shadow-sm whitespace-nowrap hover:bg-gray-50 transition-colors">
                <span className="text-gray-700 font-medium">{city}</span>
              </button>
            ))}
          </div>
        </div>
        
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Featured Spaces</h2>
        {mockListings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );

  const ListingDetail = ({ listing }) => {
    if (!listing) return null;
    
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="relative">
          <img 
            src={listing.images[0]} 
            alt={listing.title}
            className="w-full h-64 object-cover"
          />
          <button 
            className="absolute top-4 left-4 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
            onClick={() => setSelectedListing(null)}
          >
            <X size={20} color="#374151" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
            <button onClick={() => toggleFavorite(listing.id)}>
              <Heart 
                size={24} 
                color={favorites.includes(listing.id) ? "#ef4444" : "#6b7280"}
                fill={favorites.includes(listing.id) ? "#ef4444" : "none"}
              />
            </button>
          </div>
          
          <div className="flex items-center mb-4">
            <MapPin size={16} color="#6b7280" />
            <span className="text-gray-600 ml-1">{listing.location}</span>
          </div>
          
          <div className="flex items-center mb-4">
            <Star size={16} color="#fbbf24" fill="#fbbf24" />
            <span className="text-gray-900 ml-1 font-medium">{listing.rating}</span>
            <span className="text-gray-600 ml-1">({listing.reviews} reviews)</span>
          </div>
          
          <div className="flex items-center mb-4">
            <img 
              src={listing.hostAvatar} 
              alt={listing.hostName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <div className="text-gray-900 font-medium">Hosted by {listing.hostName}</div>
              <div className="text-gray-600 text-sm">Superhost</div>
            </div>
          </div>
          
          <p className="text-gray-900 mb-4">{listing.description}</p>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map((amenity, index) => (
                <div key={index} className="bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-gray-700 text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews</h3>
            {mockReviews.filter(review => review.listingId === listing.id).map(review => (
              <div key={review.id} className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center mb-2">
                  <img 
                    src={review.guestAvatar} 
                    alt={review.guestName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <div className="text-gray-900 font-medium">{review.guestName}</div>
                    <div className="flex items-center">
                      <Star size={12} color="#fbbf24" fill="#fbbf24" />
                      <span className="text-gray-600 ml-1 text-sm">{review.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">${listing.price}</div>
              <div className="text-gray-600">per night</div>
            </div>
            <button 
              className="bg-blue-600 rounded-lg px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => setShowBookingModal(true)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const BookingModal = () => {
    if (!showBookingModal) return null;
    
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Book Your Stay</h2>
            <button 
              onClick={() => setShowBookingModal(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Dates</h3>
            <div className="flex space-x-3">
              <div className="flex-1">
                <label className="block text-gray-600 mb-2">Check-in</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bookingDates.checkIn}
                  onChange={(e) => setBookingDates({...bookingDates, checkIn: e.target.value})}
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 mb-2">Check-out</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bookingDates.checkOut}
                  onChange={(e) => setBookingDates({...bookingDates, checkOut: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Guests</h3>
            <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3">
              <span className="text-gray-900">{guests} guest{guests > 1 ? 's' : ''}</span>
              <div className="flex items-center space-x-4">
                <button 
                  className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                >
                  <Minus size={16} />
                </button>
                <button 
                  className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => setGuests(guests + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Breakdown</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">${selectedListing?.price} × 3 nights</span>
                <span className="text-gray-900">${(selectedListing?.price || 0) * 3}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Service fee</span>
                <span className="text-gray-900">$12</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-semibold text-gray-900">${(selectedListing?.price || 0) * 3 + 12}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <button 
            className="w-full bg-blue-600 rounded-lg py-4 text-white font-semibold text-lg hover:bg-blue-700 transition-colors"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    );
  };

  const ProfileTab = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="bg-white px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        
        <div className="flex flex-col items-center mb-6">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" 
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900">Alex Thompson</h2>
          <p className="text-gray-600">Digital Nomad • San Francisco</p>
          <div className="flex items-center mt-2">
            <Star size={16} color="#fbbf24" fill="#fbbf24" />
            <span className="text-gray-900 ml-1 font-medium">4.9</span>
            <span className="text-gray-600 ml-1">(24 reviews)</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <Calendar size={20} color="#6b7280" />
              <span className="text-gray-900 ml-3 font-medium">My Bookings</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <Heart size={20} color="#6b7280" />
              <span className="text-gray-900 ml-3 font-medium">Favorites</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <MessageCircle size={20} color="#6b7280" />
              <span className="text-gray-900 ml-3 font-medium">Messages</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <Plus size={20} color="#6b7280" />
              <span className="text-gray-900 ml-3 font-medium">List Your Space</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ icon: Icon, message }) => (
    <div className="flex-1 bg-gray-50 flex flex-col justify-center items-center">
      <Icon size={48} color="#6b7280" />
      <p className="text-gray-600 mt-4 text-center">{message}</p>
    </div>
  );

  const BottomNav = () => (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-around">
        <button 
          className="flex flex-col items-center py-2 min-w-0"
          onClick={() => setCurrentTab('explore')}
        >
          <Search size={24} color={currentTab === 'explore' ? "#3b82f6" : "#6b7280"} />
          <span className={`text-xs mt-1 ${currentTab === 'explore' ? 'text-blue-600' : 'text-gray-600'}`}>Explore</span>
        </button>
        
        <button 
          className="flex flex-col items-center py-2 min-w-0"
          onClick={() => setCurrentTab('favorites')}
        >
          <Heart size={24} color={currentTab === 'favorites' ? "#3b82f6" : "#6b7280"} />
          <span className={`text-xs mt-1 ${currentTab === 'favorites' ? 'text-blue-600' : 'text-gray-600'}`}>Favorites</span>
        </button>
        
        <button 
          className="flex flex-col items-center py-2 min-w-0"
          onClick={() => setCurrentTab('bookings')}
        >
          <Calendar size={24} color={currentTab === 'bookings' ? "#3b82f6" : "#6b7280"} />
          <span className={`text-xs mt-1 ${currentTab === 'bookings' ? 'text-blue-600' : 'text-gray-600'}`}>Bookings</span>
        </button>
        
        <button 
          className="flex flex-col items-center py-2 min-w-0"
          onClick={() => setCurrentTab('messages')}
        >
          <MessageCircle size={24} color={currentTab === 'messages' ? "#3b82f6" : "#6b7280"} />
          <span className={`text-xs mt-1 ${currentTab === 'messages' ? 'text-blue-600' : 'text-gray-600'}`}>Messages</span>
        </button>
        
        <button 
          className="flex flex-col items-center py-2 min-w-0"
          onClick={() => setCurrentTab('profile')}
        >
          <User size={24} color={currentTab === 'profile' ? "#3b82f6" : "#6b7280"} />
          <span className={`text-xs mt-1 ${currentTab === 'profile' ? 'text-blue-600' : 'text-gray-600'}`}>Profile</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-sm mx-auto h-screen bg-white flex flex-col shadow-2xl">
      {currentTab === 'explore' && <ExploreTab />}
      {currentTab === 'profile' && <ProfileTab />}
      {currentTab === 'favorites' && (
        <EmptyState icon={Heart} message="Your favorite spaces will appear here" />
      )}
      {currentTab === 'bookings' && (
        <EmptyState icon={Calendar} message="Your bookings will appear here" />
      )}
      {currentTab === 'messages' && (
        <EmptyState icon={MessageCircle} message="Your messages will appear here" />
      )}
      
      <BottomNav />
      
      <ListingDetail listing={selectedListing} />
      <BookingModal />
    </div>
  );
};

export default NomadWorkspaceApp;