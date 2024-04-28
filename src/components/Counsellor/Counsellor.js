import React, { useEffect, useState } from 'react'
import Header from '../Header';
import { Link } from 'react-router-dom';
const Counsellor = () => {
    const [data, setData] = useState([]);

    const [user, setUser] = useState(
        {
            Name: '', Email: '', Mobile: '', Count: 0,
        }
    );

    const getdata = (e) => {
        const { Name, Email, Mobile, Count } = user;
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name, Email, Mobile, Count
            })
        }
        const res = fetch('https://lead-counsellor-default-rtdb.firebaseio.com/UserData.json', options)
        if (res) {
            alert("Application Submitted")
        }
        else {
            alert("Error occured")
        }
    }

    const fetchData = async () => {
        try {
            const url = 'https://lead-counsellor-default-rtdb.firebaseio.com/UserData.json';

            const response = await fetch(url);
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                const dataArray = Object.values(responseData || {});
                dataArray.sort((a, b) => b.Count - a.Count);
                setData(dataArray);
            } else {
                console.error('Request failed with status', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
        // console.log(data);
    }, []);

    const [search, setSearch] = useState('');

    return (
        <div className='counsellorbanner'>
            <Header />
            <div className='container '>

                <div className=" py-6 flex items-center justify-center mt-6">
                    <div className=" p-8 rounded shadow-lg md:w-1/2 sm:w-full bg-jacarta-50">
                        <h2 className=" text-accent-dark text-2xl font-semibold mb-4 text-center">ADD NEW COUNSELLOR</h2>

                        <form method='POST' action=''>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-jacarta-800">FULL NAME</label>
                                <input
                                    type="text"
                                    name='Name'
                                    className="mt-1 p-2 w-full bg-transparent border-b border-jacarta-300 hover:border-jacarta-800 outline-none"
                                    placeholder="John Doe"
                                    value={user.Name}
                                    onChange={(event) => setUser((prev) => ({ ...prev, Name: event.target.value }))}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-jacarta-800">EMAIL</label>
                                <input
                                    type="email"
                                    name='Email'
                                    className=" mt-1 p-2 w-full outline-none border-b bg-transparent border-jacarta-300 hover:border-jacarta-800"
                                    placeholder="john@example.com"
                                    value={user.Email}
                                    onChange={(event) => setUser((prev) => ({ ...prev, Email: event.target.value }))}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-jacarta-800">MOBILE NUMBER</label>
                                <input
                                    type="number"
                                    name='Phone'
                                    className=" mt-1 p-2 w-full outline-none border-b bg-transparent border-jacarta-300 hover:border-jacarta-800"
                                    placeholder="0000000000"
                                    value={user.Mobile}
                                    onChange={(event) => setUser((prev) => ({ ...prev, Mobile: event.target.value }))}
                                    required
                                />
                            </div>

                            <div className="mt-6">

                                <button
                                    type="submit"
                                    className="w-full bg-accent text-white p-2 rounded hover:bg-accent-dark transition duration-300"
                                    onClick={getdata}
                                >
                                    Add Counsellor
                                </button>

                            </div>
                        </form>
                    </div>

                </div>

                <div className='text-center text-stone-50 font-semibold'>
                    COUNSELLORS RANKING
                </div>

                <div className='border-b-2 border-blue py-2'>
                    <input
                        className="appearance-none bg-transparent border-none w-full text-stone-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='🔎 Search Counsellor...'
                    />
                </div>

                <div className='py-4 pb-12 md:inline-block sm:flex w-full'>
                    <div className='text-stone-50 grid md:grid-cols-4 text-sm font-semibold px-4 gap-2  py-5 rounded-t-lg bg-jacarta-800'>
                        <div>COUNSELLOR NAME</div>
                        <div>COUNSELLOR EMAIL</div>
                        <div>COUNSELLOR PHONE</div>
                        <div className='my-auto md:w-full sm:w-[170px]'>TOTAL FEE PAID STUDENTS</div>
                    </div>
                    <div className='md:inline-block sm:flex overflow-x-auto w-full'>
                        {data.filter((plan) => {
                            return search.toLowerCase() === '' ? plan : plan.Name.toLowerCase().includes(search)
                        }).map((plan, index) => (
                            <div key={plan.Email} className={index % 2 === 0 ? 'container grid md:grid-cols-4 gap-2 px-4 py-3 bg-jacarta-100' : 'container grid md:grid-cols-4 gap-2 px-4 py-3 bg-jacarta-50'}>
                                <div className=' '>{plan.Name}</div>
                                <div className=' '>{plan.Email}</div>
                                <div className=' '>{plan.Mobile}</div>
                                <div className=' '>{plan.Count}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='text-center'>
                    <Link to='/AdminDashboard'>
                        <button class="m-3 font-semibold bg-accent text-white p-2 px-6 text-md rounded hover:bg-accent-dark transition duration-300">
                            GO BACK
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Counsellor
