import React, { useState } from 'react';
import {
    FaUsers,
    FaUserTie,
    FaUtensils,
    FaTags,
    FaShoppingCart,
    FaCalendarCheck,
    FaBed,
    FaConciergeBell,
    FaArrowRight,
    FaEye,
    FaSignOutAlt,
    FaSignInAlt,
    FaClock,
    FaChartLine,
    FaMoneyBillWave,
} from 'react-icons/fa';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import CreateEmployeeModal from '../Employers/modals/createEmployeeModal/userModal';

const AdminDashboard: React.FC = () => {

    const navigate = useNavigate()

    const stats = {
        customers: 1245,
        employees: 28,
        menuItems: 156,
        offers: 8,
        orders: 342,
        reservations: 89,
        rooms: 45,
        tables: 32,
    };

    const recentActivities = [
        { id: 1, action: 'Nueva reservación', user: 'Cliente: María García', time: 'Hace 5 minutos', type: 'reservation' },
        { id: 2, action: 'Pedido completado', user: 'Mesa #12', time: 'Hace 15 minutos', type: 'order' },
        { id: 3, action: 'Nuevo cliente registrado', user: 'Carlos López', time: 'Hace 1 hora', type: 'customer' },
        { id: 4, action: 'Inventario actualizado', user: 'Admin', time: 'Hace 2 horas', type: 'menu' },
        { id: 5, action: 'Oferta especial creada', user: 'Promociones', time: 'Hace 3 horas', type: 'offer' },
    ];

    const sections = [
        { name: 'Clientes', icon: FaUsers, color: '#3b82f6', bg: '#eff6ff', count: stats.customers, path: '/clients' },
        { name: 'Empleados', icon: FaUserTie, color: '#10b981', bg: '#ecfdf5', count: stats.employees, path: '/employees' },
        { name: 'Menú', icon: FaUtensils, color: '#f59e0b', bg: '#fffbeb', count: stats.menuItems, path: '/menu' },
        { name: 'Ofertas', icon: FaTags, color: '#ef4444', bg: '#fef2f2', count: stats.offers, path: '/offers' },
        { name: 'Pedidos', icon: FaShoppingCart, color: '#8b5cf6', bg: '#f5f3ff', count: stats.orders, path: '/orders' },
        { name: 'Reservaciones', icon: FaCalendarCheck, color: '#ec489a', bg: '#fdf2f8', count: stats.reservations, path: '/reservations' },
        { name: 'Habitaciones', icon: FaBed, color: '#14b8a6', bg: '#f0fdfa', count: stats.rooms, path: '/rooms' },
    ];

    return (
        <div className="admin-dashboard">
            <div className="dashboard-content">
                {/* Header */}
                <div className="dashboard-header">
                    <div className="header-title">
                        <h1>Panel de Administración</h1>
                        <p>Bienvenido de vuelta. Aquí está el resumen de tu negocio</p>
                    </div>
                    <div className="header-date">
                        <div className="date-badge">
                            {new Date().toLocaleDateString('es-ES', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>

                {/* Sección 1: Métricas Hoteleras Principales */}
                <div className="hotel-overview">
                    <h2 className="section-title">Resumen del Hotel</h2>
                    <div className="stats-grid">
                        <div className="stat-card occupancy-rate">
                            <div className="stat-icon">
                                <FaBed />
                            </div>
                            <div className="stat-info">
                                <h3>78%</h3>
                                <p>Tasa de Ocupación</p>
                                <span className="trend positive">+5% desde el mes pasado</span>
                            </div>
                        </div>
                        <div className="stat-card total-reservations">
                            <div className="stat-icon">
                                <FaCalendarCheck />
                            </div>
                            <div className="stat-info">
                                <h3>24</h3>
                                <p>Reservas Hoy</p>
                                <span className="trend positive">+8 vs ayer</span>
                            </div>
                        </div>
                        <div className="stat-card total-guests">
                            <div className="stat-icon">
                                <FaUsers />
                            </div>
                            <div className="stat-info">
                                <h3>58</h3>
                                <p>Huéspedes Hoy</p>
                                <span className="trend positive">+12 vs ayer</span>
                            </div>
                        </div>
                        <div className="stat-card pending-checkins">
                            <div className="stat-icon">
                                <FaSignInAlt />
                            </div>
                            <div className="stat-info">
                                <h3>12</h3>
                                <p>Check-ins Pendientes</p>
                                <span className="trend neutral">2 en 1 hora</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección 2: Check-ins y Check-outs (Prioridad máxima) */}
                <div className="check-operations">
                    <h2 className="section-title">Operaciones del Día</h2>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="check-card">
                                <div className="card-header">
                                    <FaSignInAlt className="header-icon" />
                                    <h3>Próximos Check-ins</h3>
                                    <span className="badge">8 hoy</span>
                                </div>
                                <div className="check-list">
                                    <div className="check-item">
                                        <div className="time-badge">15:00</div>
                                        <div className="guest-info">
                                            <p className="guest-name">María González</p>
                                            <p className="room-type">Suite Presidencial</p>
                                        </div>
                                        <div className="guest-status">Confirmado</div>
                                    </div>
                                    <div className="check-item">
                                        <div className="time-badge">16:30</div>
                                        <div className="guest-info">
                                            <p className="guest-name">Carlos Rodríguez</p>
                                            <p className="room-type">Habitación Doble</p>
                                        </div>
                                        <div className="guest-status">En camino</div>
                                    </div>
                                    <div className="check-item">
                                        <div className="time-badge">18:00</div>
                                        <div className="guest-info">
                                            <p className="guest-name">Ana Martínez</p>
                                            <p className="room-type">Suite Familiar</p>
                                        </div>
                                        <div className="guest-status pending">Pendiente</div>
                                    </div>
                                </div>
                                <button className="view-more">Ver todos los check-ins →</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="check-card">
                                <div className="card-header">
                                    <FaSignOutAlt className="header-icon" />
                                    <h3>Próximos Check-outs</h3>
                                    <span className="badge">12 hoy</span>
                                </div>
                                <div className="check-list">
                                    <div className="check-item">
                                        <div className="time-badge">12:00</div>
                                        <div className="guest-info">
                                            <p className="guest-name">Laura Sánchez</p>
                                            <p className="room-type">Habitación Simple</p>
                                        </div>
                                        <div className="guest-status">Extensión solicitada</div>
                                    </div>
                                    <div className="check-item">
                                        <div className="time-badge">13:00</div>
                                        <div className="guest-info">
                                            <p className="guest-name">Pedro López</p>
                                            <p className="room-type">Habitación Doble</p>
                                        </div>
                                        <div className="guest-status">Normal</div>
                                    </div>
                                    <div className="check-item">
                                        <div className="time-badge">14:00</div>
                                        <div className="guest-info">
                                            <p className="guest-name">Sofia Ramírez</p>
                                            <p className="room-type">Suite Presidencial</p>
                                        </div>
                                        <div className="guest-status">Late check-out</div>
                                    </div>
                                </div>
                                <button className="view-more">Ver todos los check-outs →</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección 3: Distribución de Habitaciones e Ingresos */}
                <div className="room-management my-4">
                    <div className="room-distribution">
                        <div className="section-header-bottom">
                            <h2>Distribución por Tipo de Habitación</h2>
                            <button className="view-details-btn">Ver detalle</button>
                        </div>
                        <div className="room-types">
                            <div className="room-type-item">
                                <div className="room-type-header">
                                    <span className="room-name">Suite Presidencial</span>
                                    <span className="room-stats">4/6 disponibles</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: '33%', backgroundColor: '#ef4444' }} />
                                </div>
                                <div className="room-revenue">$2,400/día</div>
                            </div>
                            <div className="room-type-item">
                                <div className="room-type-header">
                                    <span className="room-name">Habitación Doble</span>
                                    <span className="room-stats">8/15 disponibles</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: '47%', backgroundColor: '#f59e0b' }} />
                                </div>
                                <div className="room-revenue">$1,200/día</div>
                            </div>
                            <div className="room-type-item">
                                <div className="room-type-header">
                                    <span className="room-name">Habitación Simple</span>
                                    <span className="room-stats">5/12 disponibles</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: '58%', backgroundColor: '#10b981' }} />
                                </div>
                                <div className="room-revenue">$800/día</div>
                            </div>
                            <div className="room-type-item">
                                <div className="room-type-header">
                                    <span className="room-name">Suite Familiar</span>
                                    <span className="room-stats">2/8 disponibles</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: '75%', backgroundColor: '#3b82f6' }} />
                                </div>
                                <div className="room-revenue">$1,800/día</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección 4: Actividad Reciente */}
                <div className="recent-activity-section">
                    <div className="recent-activity">
                        <div className="section-header-bottom">
                            <h2>Actividad Reciente</h2>
                            <button className="view-all-btn">
                                Ver todas <FaEye size={14} />
                            </button>
                        </div>
                        <div className="activity-list">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="activity-item">
                                    <div className={`activity-icon ${activity.type}`}>
                                        {activity.type === 'reservation' && <FaCalendarCheck />}
                                        {activity.type === 'order' && <FaShoppingCart />}
                                        {activity.type === 'customer' && <FaUsers />}
                                        {activity.type === 'menu' && <FaUtensils />}
                                        {activity.type === 'offer' && <FaTags />}
                                    </div>
                                    <div className="activity-details">
                                        <p className="activity-action">{activity.action}</p>
                                        <p className="activity-user">{activity.user}</p>
                                    </div>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sección 5: Módulos del Sistema */}
                <div className="system-modules">
                    <h2 className="section-title">Módulos del Sistema</h2>
                    <div className="grid-container">
                        {sections.map((section, index) => (
                            <div key={index} className="section-card" style={{ borderBottomColor: section.color }}>
                                <div className="section-header" style={{ backgroundColor: section.bg }}>
                                    <section.icon size={32} style={{ color: section.color }} />
                                </div>
                                <div className="section-body">
                                    <h3>{section.name}</h3>
                                    <p className="section-count">{section.count} registros</p>
                                    <button className="section-button" style={{ color: section.color }} onClick={() => navigate("/admin/" + section.path)}>
                                        Ver {section.name} <FaArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;