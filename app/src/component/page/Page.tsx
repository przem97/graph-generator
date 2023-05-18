import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Main from '../main/Main';

export default function Page() {
    return (
        <>
            <Header />
            <Sidebar />
            <Main  />
        </>
    );
}