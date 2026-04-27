import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import './styles.css'

const TagsInput = ({ value = [], onChange, placeholder, label, suggestions = [] }: { 
    value: string[], 
    onChange: (tags: string[]) => void, 
    placeholder: string,
    label: string,
    suggestions?: string[]
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!value.includes(inputValue.trim())) {
                onChange([...value, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const removeTag = (indexToRemove: number) => {
        onChange(value.filter((_, index) => index !== indexToRemove));
    };

    const addSuggestion = (suggestion: string) => {
        if (!value.includes(suggestion)) {
            onChange([...value, suggestion]);
        }
    };

    return (
        <FormGroup className="mb-3">
            <label>{label}</label>
            <div className="tags-input-container">
                <div className="tags-wrapper">
                    {value.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                            <button
                                type="button"
                                className="tag-remove"
                                onClick={() => removeTag(index)}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                    <input
                        type="text"
                        className="tags-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={value.length === 0 ? placeholder : ''}
                    />
                </div>
                {suggestions.length > 0 && (
                    <div className="suggestions-wrapper">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                type="button"
                                className="suggestion-tag"
                                onClick={() => addSuggestion(suggestion)}
                            >
                                + {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <small className="text-muted">Presiona Enter para agregar</small>
        </FormGroup>
    );
};

export default TagsInput