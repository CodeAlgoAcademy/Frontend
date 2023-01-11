This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## USING THE TOAST
Just like react toastify, to use the already prepared toast, you have to import the following into the component you are to display toast:
    - initialize a const to make use of the useDispatch
    - Toast(_/components/Toast.tsx_), this is like the popular ToastContainer you import when you plan on displaying a toast on a particular component.
    - toast(_/utils/toast.ts_), this represent the toast. It has the the success, info and the error toast embedded. All that's needed is to call the "toast.success()" with the string, to be displayed, passes to it and the dispatch const created.
example: You want to display a toast on the Student tab showing an error message.
    - const dispatch = useDispatch()
    - Import <Toast /> and add to it's return statement
        return(
            <div>
                <Toast />
                ...
            </div>
        )
    - make use of the toast in a function or anywhere(must be within the component).
        const onSubmit = () => {
            toast.error("Not Successful.", dispatch)
        }