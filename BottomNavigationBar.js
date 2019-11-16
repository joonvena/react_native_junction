import React, { Component } from 'react'
import { BottomNavigation } from 'react-native-material-ui';


export default function BottomNavigationBar() {

    return (
    <BottomNavigation active={"today"} hidden={false} >
        <BottomNavigation.Action
            key="today"
            icon="today"
            label="Today"
          
        />
        <BottomNavigation.Action
            key="people"
            icon="people"
            label="People"
       
        />
        <BottomNavigation.Action
            key="bookmark-border"
            icon="bookmark-border"
            label="Bookmark"
          
        />
        <BottomNavigation.Action
            key="settings"
            icon="settings"
            label="Settings"
   
        />
    </BottomNavigation>

    )
}