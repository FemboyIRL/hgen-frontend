import React, { useEffect, useState } from 'react';
import {
    FaCalendarCheck,
    FaSearch,
    FaEye,
    FaEdit,
    FaTrash,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaDownload,
    FaPlus,
    FaChartBar,
    FaCreditCard,
    FaMoneyBillWave,
} from 'react-icons/fa';
import './Reservations.css';
import { Reservation } from '../../types/reservation';
import { dummyReservations } from '../../pages/HomePage/dummy_data';

const Reservations: React.FC = () => {
    const [activeTab, setActiveTab] = useState('todas');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [reservations, setReservations] = useState<Reservation[]>([])

    useEffect(() => {
        setReservations(dummyReservations)
    }, [])

    const getStatusBadge = (status: string) => {
        const statuses: any = {
            confirmada: { class: 'status-confirmed', icon: <FaCheckCircle />, text: 'Confirmada' },
            pendiente: { class: 'status-pending', icon: <FaClock />, text: 'Pendiente' },
            check_in: { class: 'status-checkin', icon: <FaCalendarCheck />, text: 'Check-in' },
            check_out: { class: 'status-checkout', icon: <FaCalendarCheck />, text: 'Check-out' },
            cancelada: { class: 'status-cancelled', icon: <FaTimesCircle />, text: 'Cancelada' }
        };
        return statuses[status] || statuses.pendiente;
    };

    const getPaymentMethodIcon = (method: string) => {
        const methods: any = {
            tarjeta_credito: <FaCreditCard />,
            tarjeta_debito: <FaCreditCard />,
            efectivo: <FaMoneyBillWave />,
            transferencia: <FaMoneyBillWave />
        };
        return methods[method] || <FaCreditCard />;
    };

    const getPaymentMethodText = (method: string) => {
        const methods: any = {
            tarjeta_credito: 'Tarjeta de Crédito',
            tarjeta_debito: 'Tarjeta de Débito',
            efectivo: 'Efectivo',
            transferencia: 'Transferencia'
        };
        return methods[method] || method;
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(price);
    };

    const filteredReservations = reservations.filter(res => {
        const matchesSearch = res.customer_data!.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.customer_data.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.customer_data.customer_phone.includes(searchTerm) ||
            res.room_number.includes(searchTerm);
        const matchesTab = activeTab === 'todas' || res.status === activeTab;
        return matchesSearch && matchesTab;
    });

    const stats = {
        total: reservations.length,
        confirmed: reservations.filter(r => r.status === 'confirmada').length,
        pending: reservations.filter(r => r.status === 'pendiente').length,
        checkedIn: reservations.filter(r => r.status === 'check_in').length,
        totalRevenue: reservations.reduce((sum, r) => sum + r.total_price, 0)
    };

    return (
        <div className="reservations-page">
            {/* Header */}
            <div className="reservations-header">
                <div className="header-title">
                    <h1>Gestión de Reservaciones</h1>
                    <p>Administra todas las reservaciones del hotel</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary" onClick={() => setShowModal(true)}>
                        <FaPlus /> Nueva Reservación
                    </button>
                    <button className="btn-secondary">
                        <FaDownload /> Exportar
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-cards">
                <div className="stat-card">
                    <div className="stat-icon total">
                        <FaCalendarCheck />
                    </div>
                    <div className="stat-info">
                        <h3>{stats.total}</h3>
                        <p>Total Reservaciones</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon confirmed">
                        <FaCheckCircle />
                    </div>
                    <div className="stat-info">
                        <h3>{stats.confirmed}</h3>
                        <p>Confirmadas</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon pending">
                        <FaClock />
                    </div>
                    <div className="stat-info">
                        <h3>{stats.pending}</h3>
                        <p>Pendientes</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon checkedin">
                        <FaCalendarCheck />
                    </div>
                    <div className="stat-info">
                        <h3>{stats.checkedIn}</h3>
                        <p>Check-in Realizado</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon revenue">
                        <FaChartBar />
                    </div>
                    <div className="stat-info">
                        <h3>{formatPrice(stats.totalRevenue)}</h3>
                        <p>Ingresos Totales</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
                <div className="search-box">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Buscar por cliente, email, teléfono o habitación..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="tabs">
                    <button
                        className={activeTab === 'todas' ? 'active' : ''}
                        onClick={() => setActiveTab('todas')}
                    >
                        Todas
                    </button>
                    <button
                        className={activeTab === 'confirmada' ? 'active' : ''}
                        onClick={() => setActiveTab('confirmada')}
                    >
                        Confirmadas
                    </button>
                    <button
                        className={activeTab === 'pendiente' ? 'active' : ''}
                        onClick={() => setActiveTab('pendiente')}
                    >
                        Pendientes
                    </button>
                    <button
                        className={activeTab === 'check_in' ? 'active' : ''}
                        onClick={() => setActiveTab('check_in')}
                    >
                        Check-in
                    </button>
                    <button
                        className={activeTab === 'check_out' ? 'active' : ''}
                        onClick={() => setActiveTab('check_out')}
                    >
                        Check-out
                    </button>
                    <button
                        className={activeTab === 'cancelada' ? 'active' : ''}
                        onClick={() => setActiveTab('cancelada')}
                    >
                        Canceladas
                    </button>
                </div>
            </div>

            {/* Reservations Table */}
            <div className="reservations-table-container">
                <table className="reservations-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Habitación</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Total</th>
                            <th>Método Pago</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReservations.map((res) => {
                            const status = getStatusBadge(res.status);
                            return (
                                <tr key={res.id}>
                                    <td className="res-id">{res.id}</td>
                                    <td>
                                        <div className="customer-info">
                                            <strong>{res.customer_data.customer_name}</strong>
                                            <small>{res.customer_data.customer_email}</small>
                                        </div>
                                    </td>
                                    <td className="room-number">{res.room_number}</td>
                                    <td>{formatDate(res.check_in_date)}</td>
                                    <td>{formatDate(res.check_out_date)}</td>
                                    <td className="total-price">{formatPrice(res.total_price)}</td>
                                    <td>
                                        <span className="payment-method">
                                            {getPaymentMethodIcon(res.payment_method)}
                                            {getPaymentMethodText(res.payment_method)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${status.class}`}>
                                            {status.icon}
                                            {status.text}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="action-btn view" title="Ver detalles">
                                                <FaEye />
                                            </button>
                                            <button className="action-btn edit" title="Editar">
                                                <FaEdit />
                                            </button>
                                            <button className="action-btn delete" title="Eliminar">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reservations;