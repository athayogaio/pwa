import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, InputBase, Paper, Typography, Container,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import filterSlice from '../../core/slices/lessons/filter';
import useDebounce from '../../utils/hooks/useDebounce';
import LessonCard from '../../components/lesson-card';

const SearchLessonsPage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { lessons, errorMessage } = useSelector(state => state.lessons);

  const searchQuery = useDebounce(query, 500);

  useEffect(() => {
    dispatch(filterSlice());
  }, []);

  useEffect(() => {
    dispatch(filterSlice(query));
  }, [searchQuery]);
  function updateSearch(e) {
    setQuery(e.target.value);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%', height: '64px', px: '29px', boxShadow: '0px 8px 16px rgba(46, 60, 80, 0.1)',
        }}
      >
        <Typography fontSize="24px" fontWeight="500" color="text.secondary">
          Поиск
        </Typography>
        <SettingsIcon color="disabled" />
      </Box>
      <Paper
        component="form"
        sx={{
          p: '8px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
          margin: '32px auto',
        }}
      >
        <SearchIcon sx={{ margin: '4px' }} color="disabled" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={query}
          placeholder="Поиск"
          onChange={e => updateSearch(e)}
        />
      </Paper>
      {errorMessage && (
        <Typography color="error.main">
          Error:
          {errorMessage}
        </Typography>
      )}
      <Container>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          width: '800px',
          gap: '20px',
          margin: '0 auto',
        }}
        >
          {lessons && lessons.data?.map(lesson => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.name}
              description={lesson.description}
              price={lesson.price}
              level={lesson.level}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SearchLessonsPage;
