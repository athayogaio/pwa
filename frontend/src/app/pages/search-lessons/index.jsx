import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, InputBase, Paper, Typography, Container,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import filterSlice from '../../core/slices/lessons/filter';
import useDebounce from '../../utils/hooks/useDebounce';
import LessonCard from '../../components/lesson-card';
import Header from '../../components/header';

const SearchLessonsPage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { lessons, errorMessage } = useSelector(state => state.lessons);

  const searchQuery = useDebounce(query, 500);

  useEffect(() => {
    dispatch(filterSlice(query));
  }, [searchQuery]);

  function updateSearch(e) {
    setQuery(e.target.value);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Header title="Поиск" />
      <Container>
        <Paper
          component="form"
          sx={{
            p: '8px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '984px',
            margin: '32px auto',
          }}
        >
          <SearchIcon sx={{ margin: '4px' }} color="disabled" />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={query}
            placeholder="Поиск"
            onClick={e => updateSearch(e)}
            onChange={e => updateSearch(e)}
            onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
          />
        </Paper>
        {errorMessage && (
          <Typography color="error.main">
            Error:
            {errorMessage}
          </Typography>
        )}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          maxWidth: '984px',
          gap: '20px',
          margin: '0 auto',
        }}
        >
          {lessons && lessons.data?.map(lesson => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.base_course.name}
              description={lesson.base_course.description}
              price={lesson.price}
              level={lesson.base_course.level}
              favorite={lesson.favorite}
              isParticipant={lesson.participant}
              comments={lesson.comments_count}
              rate={lesson.rate}
              votes={lesson.votes_count}
              schedule={lesson.schedule}
              duration={lesson.duration}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SearchLessonsPage;
