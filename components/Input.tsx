const Input = ({ id, label, error, ...props }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`border ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );