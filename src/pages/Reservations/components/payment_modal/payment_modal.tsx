import React, { useState } from 'react';
import {
    CreditCard,
    Calendar,
    Lock,
    Smartphone,
    Shield,
    Mail,
    Phone,
} from 'lucide-react';

import { GrVisa, GrMastercard, GrAmex } from 'react-icons/gr';
import './payment_modal.css'
import { FaWhatsapp } from 'react-icons/fa';


// ===== TIPOS Y INTERFACES =====

interface CardData {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}

interface RoomDetails {
    room_number: number;
    type?: string;
    price: number;
    capacity?: number;
    [key: string]: any;
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (paymentData: CardData | any) => void;
    totalAmount: number;
    roomDetails?: RoomDetails | null;
}

type PaymentMethod = 'card' | 'paypal' | 'digital';
type CardType = 'visa' | 'mastercard' | 'amex' | '';

// ===== COMPONENTE PRINCIPAL =====

const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    totalAmount,
    roomDetails
}) => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    const [cardData, setCardData] = useState<CardData>({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [cardType, setCardType] = useState<CardType>('');
    const [errors, setErrors] = useState<Partial<CardData>>({});

    // Detectar tipo de tarjeta
    const detectCardType = (number: string): CardType => {
        const cleaned = number.replace(/\s/g, '');
        if (/^4/.test(cleaned)) return 'visa';
        if (/^5[1-5]/.test(cleaned)) return 'mastercard';
        if (/^3[47]/.test(cleaned)) return 'amex';
        return '';
    };

    // Validar número de tarjeta (algoritmo de Luhn simplificado)
    const validateCardNumber = (number: string): boolean => {
        const cleaned = number.replace(/\s/g, '');
        if (cleaned.length < 13 || cleaned.length > 19) return false;
        if (!/^\d+$/.test(cleaned)) return false;

        // Algoritmo de Luhn
        let sum = 0;
        let isEven = false;
        for (let i = cleaned.length - 1; i >= 0; i--) {
            let digit = parseInt(cleaned.charAt(i), 10);
            if (isEven) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0;
    };

    // Validar CVV
    const validateCVV = (cvv: string, cardTypeCard?: CardType): boolean => {
        const cleaned = cvv.replace(/\s/g, '');
        const minLength = cardTypeCard === 'amex' ? 4 : 3;
        const maxLength = cardTypeCard === 'amex' ? 4 : 3;
        return cleaned.length >= minLength && cleaned.length <= maxLength && /^\d+$/.test(cleaned);
    };

    // Validar fecha de expiración
    const validateExpiryDate = (expiry: string): boolean => {
        if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

        const [month, year] = expiry.split('/').map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        if (month < 1 || month > 12) return false;
        if (year < currentYear) return false;
        if (year === currentYear && month < currentMonth) return false;

        return true;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\s/g, '');
        if (value.length > 16) value = value.slice(0, 16);

        // Formatear número con espacios cada 4 dígitos
        const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
        setCardData({ ...cardData, cardNumber: formatted });
        setCardType(detectCardType(value));

        // Limpiar error
        if (errors.cardNumber) {
            setErrors({ ...errors, cardNumber: undefined });
        }
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        setCardData({ ...cardData, expiryDate: value });

        if (errors.expiryDate) {
            setErrors({ ...errors, expiryDate: undefined });
        }
    };

    const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxLength = cardType === 'amex' ? 4 : 3;
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > maxLength) value = value.slice(0, maxLength);
        setCardData({ ...cardData, cvv: value });

        if (errors.cvv) {
            setErrors({ ...errors, cvv: undefined });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<CardData> = {};

        if (!cardData.cardNumber.trim()) {
            newErrors.cardNumber = 'El número de tarjeta es requerido';
        } else if (!validateCardNumber(cardData.cardNumber)) {
            newErrors.cardNumber = 'Número de tarjeta inválido';
        }

        if (!cardData.cardName.trim()) {
            newErrors.cardName = 'El nombre del titular es requerido';
        } else if (cardData.cardName.length < 3) {
            newErrors.cardName = 'Nombre completo requerido';
        }

        if (!cardData.expiryDate) {
            newErrors.expiryDate = 'Fecha de expiración requerida';
        } else if (!validateExpiryDate(cardData.expiryDate)) {
            newErrors.expiryDate = 'Fecha inválida o expirada';
        }

        if (!cardData.cvv) {
            newErrors.cvv = 'CVV requerido';
        } else if (!validateCVV(cardData.cvv, cardType)) {
            newErrors.cvv = `CVV inválido (${cardType === 'amex' ? '4' : '3'} dígitos)`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsProcessing(true);

        // Simular procesamiento de pago
        setTimeout(() => {
            setIsProcessing(false);
            onConfirm(cardData);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="payment-modal-overlay" onClick={onClose}>
            <div className="payment-modal" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="modal-header">
                    <div className="header-left">
                        <CreditCard className="header-icon" />
                        <h2>Pago seguro</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                {/* Métodos de pago */}
                <div className="payment-methods">
                    <button
                        className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('card')}
                    >
                        <CreditCard size={20} />
                        <span>Tarjeta</span>
                    </button>
                    <button
                        className={`method-btn ${paymentMethod === 'digital' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('digital')}
                    >
                        <Smartphone size={20} />
                        <span>Billetera</span>
                    </button>
                </div>

                {/* Formulario de pago */}
                {paymentMethod === 'card' && (
                    <form onSubmit={handleSubmit}>
                        {/* Información de la reserva */}
                        {roomDetails && (
                            <div className="booking-info">
                                <div className="booking-info-row">
                                    <span>Habitación {roomDetails.room_number}</span>
                                    <span>${roomDetails.price}/noche</span>
                                </div>
                                <div className="booking-info-row total">
                                    <span>Total a pagar</span>
                                    <span className="total-amount">${totalAmount}</span>
                                </div>
                            </div>
                        )}

                        {/* Número de tarjeta */}
                        <div className="form-group">
                            <label className="form-label">
                                Número de tarjeta
                                {cardType && (
                                    <span className="card-badge">
                                        {cardType === 'visa' && <GrVisa size={24} />}
                                        {cardType === 'mastercard' && <GrMastercard size={24} />}
                                        {cardType === 'amex' && <GrAmex size={24} />}
                                    </span>
                                )}
                            </label>
                            <div className="input-icon-wrapper">
                                <CreditCard className="input-icon" size={18} />
                                <input
                                    type="text"
                                    className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                                    placeholder="1234 5678 9012 3456"
                                    value={cardData.cardNumber}
                                    onChange={handleCardNumberChange}
                                    maxLength={19}
                                    required
                                />
                            </div>
                            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                        </div>

                        {/* Nombre del titular */}
                        <div className="form-group">
                            <label className="form-label">Nombre del titular</label>
                            <div className="input-icon-wrapper">
                                <CreditCard className="input-icon" size={18} />
                                <input
                                    type="text"
                                    className={`form-input ${errors.cardName ? 'error' : ''}`}
                                    placeholder="Como aparece en la tarjeta"
                                    value={cardData.cardName}
                                    onChange={(e) => {
                                        setCardData({ ...cardData, cardName: e.target.value });
                                        if (errors.cardName) setErrors({ ...errors, cardName: undefined });
                                    }}
                                    required
                                />
                            </div>
                            {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                        </div>

                        {/* Fila de fecha y CVV */}
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Fecha expiración</label>
                                <div className="input-icon-wrapper">
                                    <Calendar className="input-icon" size={18} />
                                    <input
                                        type="text"
                                        className={`form-input ${errors.expiryDate ? 'error' : ''}`}
                                        placeholder="MM/AA"
                                        value={cardData.expiryDate}
                                        onChange={handleExpiryChange}
                                        maxLength={5}
                                        required
                                    />
                                </div>
                                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">CVV</label>
                                <div className="input-icon-wrapper">
                                    <Lock className="input-icon" size={18} />
                                    <input
                                        type="text"
                                        className={`form-input ${errors.cvv ? 'error' : ''}`}
                                        placeholder={cardType === 'amex' ? '1234' : '123'}
                                        value={cardData.cvv}
                                        onChange={handleCVVChange}
                                        maxLength={cardType === 'amex' ? 4 : 3}
                                        required
                                    />
                                </div>
                                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="modal-actions">
                            <button type="button" className="btn-cancel" onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn-confirm" disabled={isProcessing}>
                                {isProcessing ? (
                                    <>
                                        <div className="spinner"></div>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} />
                                        Pagar ${totalAmount}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {/* Métodos digitales */}
                {paymentMethod === 'digital' && (
                    <div className="digital-wallets">

                        {/* Método de pago en efectivo */}
                        <div className="cash-payment-section">
                            <div className="cash-info">
                                <div className="cash-icon-wrapper">
                                    <svg className="cash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="6" width="20" height="12" rx="2" />
                                        <circle cx="12" cy="12" r="2" />
                                        <path d="M6 12h.01M18 12h.01" />
                                    </svg>
                                </div>
                                <h3 className="cash-title">Pago en efectivo</h3>
                                <p className="cash-description">
                                    Realiza tu reserva ahora y paga en efectivo al momento de tu llegada
                                </p>
                            </div>

                            <div className="contact-info">
                                <div className="contact-row">
                                    <Mail size={18} />
                                    <span>reservaciones@hgensuites.com</span>
                                </div>
                                <div className="contact-row">
                                    <Phone size={18} />
                                    <span>+52 (55) 1234 5678</span>
                                </div>
                                <div className="contact-row">
                                    <FaWhatsapp size={20} />
                                    <span>+52 55 1234 5678</span>
                                </div>
                            </div>

                            <div className="reservation-instructions">
                                <h4 className="instructions-title">¿Cómo reservar?</h4>
                                <ol className="instructions-list">
                                    <li>Completa todos los datos de tu reserva</li>
                                    <li>Envía un correo a <strong>reservaciones@hgensuites.com</strong></li>
                                    <li>Incluye tu nombre, fechas y habitación seleccionada</li>
                                    <li>Recibirás una confirmación en 24 horas</li>
                                    <li>Paga en efectivo al momento de tu llegada</li>
                                </ol>
                            </div>

                            <button
                                className="email-reservation-btn"
                                onClick={() => window.location.href = 'mailto:reservaciones@hgensuites.com'}
                            >
                                <Mail size={18} />
                                Enviar correo de reservación
                            </button>

                            <div className="security-note">
                                <Shield size={16} />
                                <span>Sin pago por adelantado - Paga directamente en el hotel</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer de seguridad */}
                <div className="modal-footer">
                    <Shield size={14} />
                    <span>Pago 100% seguro. Tus datos están protegidos.</span>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;