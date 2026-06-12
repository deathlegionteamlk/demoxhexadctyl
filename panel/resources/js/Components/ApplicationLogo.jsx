export default function ApplicationLogo(props) {
    return (
        <span {...props} className={"font-bold text-2xl " + (props.className || '')}>
            DEMO × HEXA
        </span>
    );
}
