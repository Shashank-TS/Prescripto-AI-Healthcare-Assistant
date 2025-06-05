import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../components/context/AppContext';

const All_Doctors = () => {
    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

    const { doctors } = useContext(AppContext);

    const ApplyFilter = () => {
        let filtered = doctors;
        if (speciality) {
            filtered = filtered.filter(doc => doc.speciality === speciality);
        }
        if (selectedCity) {
            filtered = filtered.filter(doc => doc.city === selectedCity);
        }
        setFilterDoc(filtered);
    };

    useEffect(() => {
        ApplyFilter();
    }, [doctors, speciality, selectedCity]);

    const uniqueCities = [...new Set(doctors.map(doc => doc.city))];

    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors specialist.</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                <button 
                    className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} 
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    Filters
                </button>
                
                {/* Sidebar Filters */}
                <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    {/* Speciality Filter */}
                    {['General physician', 'Gynecologist', 'Pediatricians', 'Dermatologist', 'Neurologist', 'Gastroenterologist'].map(spec => (
                        <p 
                            key={spec} 
                            onClick={() => speciality === spec ? navigate('/all_doctors') : navigate(`/doctor_home/all_doctors/${spec}`)} 
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? "bg-indigo-100 text-black" : ""}`}
                        >
                            {spec}
                        </p>
                    ))}
                    <button className='mt-3 p-2 border rounded cursor-pointer text-start bg-primary text-white'>Search by City</button>
                    
                    {/* City Filter */}
                    <select 
                        className='mt-3 p-2 border rounded cursor-pointer' 
                        value={selectedCity} 
                        onChange={(e) => setSelectedCity(e.target.value)}
                    >
                        <option value=''>All Cities</option>
                        {uniqueCities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                
                {/* Doctors Listing */}
                <div className='w-full grid grid-cols-auto gap-4 gap-y-6 px-3'>
                    {filterDoc.map((item, index) => (
                        <div 
                            onClick={() => navigate(`/appointment/${item._id}`)} 
                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-14px] transition-all duration-500' 
                            key={index}
                        >
                            <img className='bg-blue-50 w-full h-72' src={item.imageurl} alt={item.name} />
                            <div className='p-4'>
                                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                    <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                                </div>
                                <p>{item.name}</p>
                                <p>{item.speciality}</p>
                                <p className='text-gray-500 text-sm'>{item.city}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default All_Doctors;
