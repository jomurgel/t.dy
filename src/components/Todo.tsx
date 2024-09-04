// src/components/TodoComponent.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addTodo, toggleTodo, deleteTodo } from '../utils/_todoSlice';

const TodoComponent: React.FC = () => {
    return (
        <Text style={styles.background}>Test</Text>
    );
};

// @todo: add to shared styles export.
const yellow = '#ffcc00';
const white = '#fff'
const styles = StyleSheet.create({
    background: {
        backgroundColor: white,
    }
});

export default TodoComponent;