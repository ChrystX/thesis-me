const Alert = ({ type = 'error', message }) => {
    if (!message) return null;

    const styles = {
        error: 'bg-red-50 border-red-500 text-red-700',
        success: 'bg-green-50 border-green-500 text-green-700'
    };

    return (
        <div className={`mb-6 p-4 border-l-4 rounded ${styles[type]}`}>
            {message}
        </div>
    );
};

export default Alert;
