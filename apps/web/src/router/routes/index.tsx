import { ErrorPage } from '#/components';
import { Home } from './home';
import { Root } from './root';
import { SignIn } from './sign-in';
import { SignUp } from './sign-up';
import { AddWorkout, Workout, Workouts } from './workouts';

export const routes = [
    {
        path: '/',
        element: <Root />,

        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'workouts',
                element: <Workouts />,
            },
            {
                path: 'workouts/:workoutId',
                element: <Workout />,
            },
            {
                path: 'workouts/add',
                element: <AddWorkout />,
            },
        ],
    },
    {
        path: '/sign-in',
        element: <SignIn />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
];
