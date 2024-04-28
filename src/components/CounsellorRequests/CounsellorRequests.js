import React, { useState, useEffect } from 'react';
import Header from '../Header';

const CounsellorRequests = () => {
    const [search, setSearch] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedAlert, setApprovedAlert] = useState(false);
    const [rejectedAlert, setRejectedAlert] = useState(false);
    useEffect(() => {
        // Fetch pending requests from initial database API endpoint
        fetch('https://leadmgmt-fc334-default-rtdb.firebaseio.com/UserData.json')
            .then(response => response.json())
            .then(data => {
                // Convert object of objects to array of objects
                const requestsArray = Object.keys(data).map(key => ({ key, ...data[key] }));
                setPendingRequests(requestsArray);
            })
            .catch(error => console.error('Error fetching pending requests:', error));
    }, []);

    const handleApproval = (approvedRequest) => {
        // Post approved request to new database API endpoint
        fetch('https://lead-counsellor-default-rtdb.firebaseio.com/UserData.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(approvedRequest),
        })
            .then(response => {
                // Remove request from initial database upon successful approval
                if (response.ok) {
                    fetch(`https://leadmgmt-fc334-default-rtdb.firebaseio.com/UserData/${approvedRequest.key}.json`, {
                        method: 'DELETE',
                    })
                        .then(() => {
                            console.log('Request removed from initial database');
                            setApprovedAlert(true); // Set the approved alert to true
                        })
                        .catch(error => console.error('Error removing request from initial database:', error));
                }
            })
            .catch(error => console.error('Error posting approved request:', error));
    };

    const handleRejection = (rejectedRequest) => {
        // Remove request from initial database upon rejection
        fetch(`https://leadmgmt-fc334-default-rtdb.firebaseio.com/UserData/${rejectedRequest.key}.json`, {
            method: 'DELETE',
        })
            .then(() => {
                console.log('Request removed from initial database');
                setRejectedAlert(true); // Set the rejected alert to true
            })
            .catch(error => console.error('Error removing request from initial database:', error));
    };

    return (
        <div className='studentdashboardbanner md:h-full sm:h-screen md:min-h-screen'>
            <Header />
            {approvedAlert && <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', marginBottom: '10px' }}>Request Approved!</div>}
            {rejectedAlert && <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', marginBottom: '10px' }}>Request Rejected!</div>}
            <div className=' p-8 px-48'>
                <div className='border-b-2 border-blue py-2'>
                    <input
                        className="appearance-none bg-transparent border-none w-full text-stone-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='🔎 Search Applicant Name...'
                    />
                </div>
                <div className='flex text-jacarta-100 bg-jacarta-900 p-4 gap-32 rounded-t font-semibold px-12 mt-8'>
                    <div>EMAIL</div>
                    <div>MOBILE</div>
                    <div>NAME</div>
                    <div>CGPA</div>
                </div>
                {pendingRequests.filter((request)=> {
                    return search.toLowerCase() === '' ? request : request.Name.toLowerCase().includes(search)
                }).map((request, index) => (
                    <div key={request.key} className={index % 2 === 0 ? ' text-jacarta-900 flex px-4 py-2 bg-jacarta-100 justify-between' : 'text-jacarta-900 flex px-4 py-2 bg-jacarta-300 justify-between'}>
                        <div className='flex gap-20 '>
                            <div className=' my-auto'>{request.Email}</div>
                            <div className=' my-auto'>{request.Mobile}</div>
                            <div className=' my-auto'>{request.Name}</div>
                            <div className=' my-auto'>{request.cgpa}</div>
                        </div>
                        <div className='flex gap-12 text-white'>
                            <div><button className='px-4 py-2 rounded bg-green applybutton' onClick={() => handleApproval(request)}>Approve</button></div>
                            <div><button className='bg-red px-6 py-2 rounded applybutton' onClick={() => handleRejection(request)}>Reject</button></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CounsellorRequests
