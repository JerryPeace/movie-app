import { useCallback } from 'react';
import {
  TextInput,
  minLength,
  maxLength,
  required,
  Create,
  SimpleForm,
  useCreate,
  useGetOne,
} from 'react-admin';
import { FieldValues } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Loading from 'components/Loading';
import { resourceName } from './constants';

interface CreateCommentProps {
  movieID: number;
  onClose: () => void;
}

interface CommentType {
  name: string;
  comment: string;
}

const CreateComment = ({ onClose, movieID }: CreateCommentProps): JSX.Element => {
  const [create, { isLoading }] = useCreate();
  const { data, refetch } = useGetOne(resourceName, { id: movieID });
  const postSave = useCallback(
    (comment: FieldValues) => {
      create(
        resourceName,
        { data: { id: data.id, comments: comment } },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    },
    [create, data, refetch]
  );

  const validateUsername = [required(), minLength(1), maxLength(64)];
  const validateCreate = (values: FieldValues) => {
    const errors: { comment?: string; name?: string } = {};
    if (!values.comment) {
      errors.comment = 'Please input comment';
    }
    if (!values.name) {
      errors.name = 'Please input name';
    }
    return errors;
  };

  return isLoading ? (
    <Box pt={5} height={{ xs: '100vh' }} width={{ xs: '100vW', sm: 420 }}>
      <Loading sx={{ position: 'relative' }} />
    </Box>
  ) : (
    <Create resource={resourceName} title=" ">
      <Box pt={5} width={{ xs: '100vW', sm: 420 }} mt={{ xs: 2, sm: 1 }}>
        <Stack direction="row" p={2}>
          <Typography variant="h6" flex="1">
            {data?.film}
          </Typography>
          <Box>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>
        <Box sx={{ margin: 2, overflow: 'auto', height: 320 }}>
          <MovieForm label="Genre" data={data.genre} />
          <MovieForm label="Lead Studio" data={data.lead_studio} />
          <MovieForm label="Audience Score" data={data.audience_score} />
          <MovieForm label="Profitability" data={data.profitability} />
          <MovieForm label="Rotten Tomatoes Rating" data={data.rotten_tomatoes} />
          <MovieForm label="Worldwide Gross" data={data.worldwide_gross} />
          <MovieForm label="Year Release" data={data.year} />
          <FormLabel>{'Comment: '}</FormLabel>
          <CommentForm comments={data.comments} />
        </Box>
        <SimpleForm onSubmit={postSave} validate={validateCreate}>
          <TextInput source="name" label="Name" validate={validateUsername} fullWidth />
          <TextInput source="comment" label="Comment" validate={validateUsername} fullWidth />
        </SimpleForm>
      </Box>
    </Create>
  );
};

export default CreateComment;

const CommentForm = ({ comments }: { comments: CommentType[] }) => {
  return comments.length > 0 ? (
    <ul style={{ margin: '0 10px' }}>
      {comments.map((item: CommentType, index) => (
        <li key={index}>
          <span>{`${item.name}: `}</span>
          <span>{item.comment}</span>
        </li>
      ))}
    </ul>
  ) : (
    <Box>No any comments</Box>
  );
};

const MovieForm = (props: { label: string; data: string | number }) => (
  <Box sx={{ marginBottom: 0.5 }}>
    <FormLabel sx={{ width: 200, display: 'inline-block' }}>{`${props.label}: `}</FormLabel>
    <Box component="span">{props.data}</Box>
  </Box>
);
