import classes from './boxComponent.module.css';

export default function BoxComponent({author, body}: {author: string, body: string}) {
    return (
        <div className={classes.post}>
            <p className={classes.author}>{author}</p>
            <p className={classes.text}>{body}</p>
        </div>
    )
}