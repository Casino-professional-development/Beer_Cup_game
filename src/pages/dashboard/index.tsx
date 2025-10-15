import React from 'react';
import Left from '../../components/left';
import Right from '../../components/dashboard/right';
import './index.scss';
import Top from '../../components/top';

const DashboardPage = () => {
    
    return (
        <div className='dashboard'>
            <Left />
            <div className='dashboard-rigth'>
                <Top />
                <Right />
            </div>
        </div>
    )
}

export default DashboardPage;