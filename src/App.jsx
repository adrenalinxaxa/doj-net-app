import React, { useState, useEffect, useRef } from 'react';

// --- SVG Icons als React Komponenten ---
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d={path} />
    </svg>
);
const ICONS = {
    user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
    logout: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
    users: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
    folder: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",
    dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
    trash: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
    edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
    plus: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2zM8 21V7h11v14H8z",
    close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z",
    history: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z",
    shield: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
    sparkles: "M19.5 9.5c.18 0 .36-.03.53-.08l-1.66-2.88-2.6-1.5-1.01 1.75.01.02.78 1.35.01.02 2.94 1.34zM12 2l-1.88 3.25-3.62 2.12.5 1 3.42-2.01L12 3.1zM8.5 7.5L5 9.5l2.94-1.34.78-1.35.01-.02 1.01-1.75-2.6 1.5-1.66 2.88c.17.05.35.08.53.08zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM22 12c0-.18-.03-.36-.08-.53l-2.88-1.66-1.5-2.6-1.75 1.01.02.01 1.35.78.02.01 1.34 2.94.02.01.01.01h.01zM3.08 11.47c-.05-.17-.08-.35-.08-.53H3l.01-.01.02-.01 1.34-2.94.02-.01 1.35-.78.02-.01 1.75-1.01-1.5 2.6-2.88 1.66zM9.5 19.5c-.18 0-.36.03-.53.08l1.66 2.88 2.6 1.5 1.01-1.75-.01-.02-.78-1.35-.01-.02-2.94-1.34zM12 22l1.88-3.25 3.62-2.12-.5-1-3.42 2.01L12 20.9zM15.5 16.5l3.5-2-2.94 1.34-.78 1.35-.01.02-1.01 1.75 2.6-1.5 1.66-2.88c-.17-.05-.35-.08-.53-.08z"
};

const SECURITY_LEVEL_MAP = { 'Stufe 1': 1, 'Stufe 2': 2, 'Stufe 3': 3, 'Stufe 4': 4, 'Stufe 5': 5 };
const SECURITY_LEVEL_CLASS_MAP = {
    'Stufe 1': 'from-green-400 to-green-500',
    'Stufe 2': 'from-yellow-400 to-yellow-500',
    'Stufe 3': 'from-orange-400 to-orange-500',
    'Stufe 4': 'from-red-400 to-red-500',
    'Stufe 5': 'from-purple-500 to-purple-600',
};

// --- Hilfskomponenten ---
const Popup = ({ title, message, onClose }) => {
    const copyToClipboard = () => { if (navigator.clipboard) { navigator.clipboard.writeText(message).catch(err => console.error('Could not copy text: ', err)); } };
    return ( <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-fast"><div className="bg-slate-800 border border-slate-700 text-white p-6 rounded-lg shadow-2xl w-full max-w-md "><div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold">{title}</h3><button onClick={onClose} className="text-slate-400 hover:text-white"><Icon path={ICONS.close}/></button></div><div className="bg-slate-900 p-4 rounded mb-4 font-mono text-sm text-slate-300"><pre className="whitespace-pre-wrap break-all">{message}</pre></div><div className="flex justify-end"><button onClick={copyToClipboard} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 transition-all"><Icon path={ICONS.copy} className="w-5 h-5"/><span>Kopieren</span></button></div></div></div> );
};
const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => ( <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-fast"><div className="bg-slate-800 border border-slate-700 text-white p-6 rounded-lg shadow-2xl w-full max-w-md"><h3 className="text-xl font-bold mb-2">{title}</h3><p className="text-slate-300 mb-6">{message}</p><div className="flex justify-end space-x-4"><button onClick={onCancel} className="bg-slate-600 text-slate-100 px-4 py-2 rounded-md hover:bg-slate-500 transition-all">Abbrechen</button><button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center space-x-2 transition-all"><Icon path={ICONS.trash} className="w-5 h-5"/><span>Löschen</span></button></div></div></div> );

// --- Ansichts-Komponenten ---
const RecordsListView = ({ currentUser, searchTerm, setSearchTerm, showForm, setShowForm, addRecord, newRecord, handleNewRecordChange, filteredRecords, openRecord, getSecurityLevelClass, requestDeleteRecord }) => (
    <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <input type="text" placeholder="Akte suchen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-auto flex-grow bg-slate-100 text-slate-800 px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center space-x-2">
                <Icon path={ICONS.plus} className="w-5 h-5"/><span>Neue Akte</span>
            </button>
        </div>
        {showForm && ( <form onSubmit={addRecord} className="mb-8 p-6 bg-slate-100/50 rounded-lg animate-fade-in"><h2 className="text-xl font-semibold mb-4 text-slate-800">Neue Akte erstellen</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><input name="name" type="text" value={newRecord.name} onChange={handleNewRecordChange} placeholder="Name des Bürgers" className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg" required /><input name="birthdate" type="date" value={newRecord.birthdate} onChange={handleNewRecordChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-500" /><input name="address" type="text" value={newRecord.address} onChange={handleNewRecordChange} placeholder="Adresse" className="md:col-span-2 w-full px-4 py-2 bg-white border border-slate-300 rounded-lg" /><input name="phone" type="tel" value={newRecord.phone} onChange={handleNewRecordChange} placeholder="Telefonnummer" className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg" /><select name="securityLevel" value={newRecord.securityLevel} onChange={handleNewRecordChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg" ><option>Stufe 1</option><option>Stufe 2</option><option>Stufe 3</option><option>Stufe 4</option><option>Stufe 5</option></select></div><button type="submit" className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300">Akte anlegen & öffnen</button></form> )}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md"><table className="min-w-full"><thead className="bg-slate-100"><tr><th className="text-left py-3 px-6 font-semibold text-slate-600 uppercase text-sm tracking-wider">Akten-ID</th><th className="text-left py-3 px-6 font-semibold text-slate-600 uppercase text-sm tracking-wider">Name</th><th className="text-left py-3 px-6 font-semibold text-slate-600 uppercase text-sm tracking-wider">Geburtsdatum</th><th className="text-left py-3 px-6 font-semibold text-slate-600 uppercase text-sm tracking-wider">Sicherheitsstufe</th><th className="text-right py-3 px-6 font-semibold text-slate-600 uppercase text-sm tracking-wider">Aktion</th></tr></thead><tbody className="divide-y divide-slate-200">
            {filteredRecords.length > 0 ? filteredRecords.map(record => { const canAccess = currentUser.securityLevel >= SECURITY_LEVEL_MAP[record.securityLevel]; return (
            <tr key={record.id} onClick={() => canAccess && openRecord(record)} className={`transition-all duration-200 ${!canAccess ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'cursor-pointer hover:bg-blue-50'}`} title={!canAccess ? "Keine ausreichende Sicherheitsfreigabe" : `Akte ${record.name} öffnen`}>
                <td className="py-4 px-6 text-slate-700 font-mono">DOJ-{String(record.id).padStart(5, '0')}</td><td className="py-4 px-6 text-slate-900 font-semibold">{record.name}</td><td className="py-4 px-6 text-slate-600">{record.birthdate || 'N/A'}</td><td className="py-4 px-6"><span className={`px-3 py-1 text-sm font-bold text-white rounded-full bg-gradient-to-r shadow-md ${getSecurityLevelClass(record.securityLevel)}`}>{record.securityLevel}</span></td><td className="py-4 px-6 text-right">
                {canAccess && (<button onClick={(e) => { e.stopPropagation(); requestDeleteRecord(record.id); }} className="text-slate-400 hover:text-red-600 p-2 rounded-full hover:bg-red-100 transition-all"><Icon path={ICONS.trash} className="w-5 h-5"/></button>)}
                </td>
            </tr>
            )}) : (<tr><td colSpan="5" className="text-center py-12 text-slate-500">Keine Akten gefunden.</td></tr>)}
        </tbody></table></div>
    </div>
);
const RecordDetailView = ({ editedRecord, setEditedRecord, closeRecord, saveRecord, currentUser, formatDate, getSecurityLevelClass }) => {
    const [activeTab, setActiveTab] = useState('details'); 
    const [newEntryText, setNewEntryText] = useState(''); 
    const [editingEntry, setEditingEntry] = useState(null);
    const [summary, setSummary] = useState('');
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState('');
    
    const generateSummary = async () => {
        if (!editedRecord || editedRecord.entries.length === 0) {
            setSummaryError("Keine Einträge zum Zusammenfassen vorhanden.");
            return;
        }
        setIsSummaryLoading(true);
        setSummaryError('');
        setSummary('');

        const prompt = `Fasse die folgenden Akteneinträge für einen Polizeibeamten prägnant zusammen. Konzentriere dich auf die wichtigsten Ereignisse, Personen und Fakten. Antworte in Stichpunkten:\n\n---\n\n${editedRecord.entries.map(e => `[${formatDate(e.timestamp)} - ${e.author}]: ${e.text}`).join('\n\n')}\n\n---\n\nZusammenfassung:`;

        try {
            const apiKey = ""; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (!response.ok) {
                throw new Error(`API-Fehler: ${response.statusText}`);
            }

            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts[0].text) {
                setSummary(result.candidates[0].content.parts[0].text);
            } else {
                throw new Error("Keine gültige Zusammenfassung von der API erhalten.");
            }
        } catch (error) {
            console.error("Fehler bei der Generierung der Zusammenfassung:", error);
            setSummaryError(`Fehler: ${error.message}`);
        } finally {
            setIsSummaryLoading(false);
        }
    };


    const handleEditRecordChange = (e) => { const { name, value } = e.target; setEditedRecord(prev => ({ ...prev, [name]: value, history: [...(prev.history || []), { user: currentUser.username, action: `Personendatenfeld '${name}' geändert`, timestamp: new Date().toISOString() }]})); };
    const addEntry = () => { if (!newEntryText.trim()) return; const newEntry = { id: Date.now(), author: currentUser.username, timestamp: new Date().toISOString(), text: newEntryText }; setEditedRecord(prev => ({ ...prev, entries: [newEntry, ...prev.entries], history: [...(prev.history || []), { user: currentUser.username, action: `Neuen Eintrag hinzugefügt`, timestamp: new Date().toISOString() }]})); setNewEntryText(''); };
    const startEditing = (entry) => setEditingEntry({ ...entry }); const cancelEditing = () => setEditingEntry(null);
    const saveEntryEdit = () => { setEditedRecord(prev => ({ ...prev, entries: prev.entries.map(e => e.id === editingEntry.id ? editingEntry : e), history: [...(prev.history || []), { user: currentUser.username, action: `Eintrag #${editingEntry.id} bearbeitet`, timestamp: new Date().toISOString() }]})); setEditingEntry(null); };
    const deleteEntry = (entryId) => { setEditedRecord(prev => ({ ...prev, entries: prev.entries.filter(e => e.id !== entryId), history: [...(prev.history || []), { user: currentUser.username, action: `Eintrag #${entryId} gelöscht`, timestamp: new Date().toISOString() }]})); };
    
    return (
    <div className="p-6 md:p-8 animate-fade-in">
        <div className="flex justify-between items-start mb-4">
            <div><h2 className="text-3xl font-bold text-slate-800">{editedRecord.name}</h2><span className={`mt-2 inline-block px-4 py-1 text-sm font-bold text-white rounded-full bg-gradient-to-r shadow-lg ${getSecurityLevelClass(editedRecord.securityLevel)}`}>{editedRecord.securityLevel}</span></div>
            <div className="flex space-x-2">
                 <button onClick={generateSummary} disabled={isSummaryLoading} className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-all flex items-center space-x-2 disabled:bg-slate-400 disabled:cursor-wait">
                    <Icon path={ICONS.sparkles} className="w-5 h-5"/>
                    <span>{isSummaryLoading ? 'Wird generiert...' : '✨ Akte zusammenfassen'}</span>
                 </button>
                 <button onClick={closeRecord} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-300 transition-all">Zurück</button>
            </div>
        </div>
        
        {(summary || summaryError) && (
            <div className={`p-4 mb-6 rounded-lg border ${summaryError ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200'}`}>
                <h4 className="font-bold mb-2 text-lg">{summaryError ? 'Fehler' : '✨ KI-Zusammenfassung'}</h4>
                <p className="whitespace-pre-wrap">{summary || summaryError}</p>
            </div>
        )}

        <div className="border-b border-slate-200 mb-6"><nav className="flex space-x-2"><button onClick={() => setActiveTab('details')} className={`py-3 px-4 font-semibold ${activeTab === 'details' ? 'border-b-2 border-slate-800 text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}>Details</button><button onClick={() => setActiveTab('history')} className={`py-3 px-4 font-semibold ${activeTab === 'history' ? 'border-b-2 border-slate-800 text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}>Verlauf</button></nav></div>
        {activeTab === 'details' && (<div>
            <h3 className="text-xl font-bold text-slate-700 mb-4">Personendaten</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-slate-50/70 rounded-lg border border-slate-200"><div className="col-span-1"><label className="font-semibold text-slate-600 block mb-1">Name</label><input name="name" type="text" value={editedRecord.name} onChange={handleEditRecordChange} className="w-full p-2 border border-slate-300 rounded-lg"/></div><div><label className="font-semibold text-slate-600 block mb-1">Geburtsdatum</label><input name="birthdate" type="date" value={editedRecord.birthdate} onChange={handleEditRecordChange} className="w-full p-2 border border-slate-300 rounded-lg text-slate-500"/></div><div className="md:col-span-2"><label className="font-semibold text-slate-600 block mb-1">Adresse</label><input name="address" type="text" value={editedRecord.address} onChange={handleEditRecordChange} className="w-full p-2 border border-slate-300 rounded-lg"/></div><div><label className="font-semibold text-slate-600 block mb-1">Telefonnummer</label><input name="phone" type="tel" value={editedRecord.phone} onChange={handleEditRecordChange} className="w-full p-2 border border-slate-300 rounded-lg"/></div><div><label className="font-semibold text-slate-600 block mb-1">Sicherheitsstufe</label><select name="securityLevel" value={editedRecord.securityLevel} onChange={handleEditRecordChange} className="w-full p-2 border border-slate-300 rounded-lg bg-white"><option>Stufe 1</option><option>Stufe 2</option><option>Stufe 3</option><option>Stufe 4</option><option>Stufe 5</option></select></div></div>
            <h3 className="text-xl font-bold text-slate-700 mb-4">Akteneinträge</h3>
            <div className="space-y-4 mb-6">{editedRecord.entries.map(entry => (<div key={entry.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                {editingEntry?.id === entry.id ? (<div><textarea value={editingEntry.text} onChange={(e) => setEditingEntry({...editingEntry, text: e.target.value})} className="w-full h-24 p-2 border border-slate-400 rounded-lg bg-slate-50"/><div className="flex justify-end space-x-2 mt-2"><button onClick={cancelEditing} className="bg-slate-200 text-slate-800 px-3 py-1 rounded-md text-sm">Abbrechen</button><button onClick={saveEntryEdit} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">Speichern</button></div></div>) : (<div><p className="text-slate-800 whitespace-pre-wrap">{entry.text}</p><div className="text-right text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 flex justify-between items-center"><span>{entry.author} - {formatDate(entry.timestamp)} Uhr</span><div className="flex space-x-2"><button onClick={() => startEditing(entry)} className="text-slate-500 hover:text-slate-900 text-xs font-semibold">Bearbeiten</button><button onClick={() => deleteEntry(entry.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold">Löschen</button></div></div></div>)}
            </div>))}{editedRecord.entries.length === 0 && <p className="text-slate-500 italic p-4 text-center">Noch keine Einträge vorhanden.</p>}</div>
            <div className="bg-slate-50/70 p-6 rounded-lg mt-8 border border-slate-200"><h4 className="font-bold text-lg mb-2 text-slate-700">Neuen Eintrag hinzufügen</h4><textarea value={newEntryText} onChange={(e) => setNewEntryText(e.target.value)} className="w-full h-24 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400" placeholder="Fügen Sie hier einen neuen Eintrag hinzu..."/><button onClick={addEntry} className="mt-4 bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors">Eintrag hinzufügen</button></div>
        </div>)}
        {activeTab === 'history' && (<div className="bg-slate-50/70 p-6 rounded-lg border border-slate-200"><h3 className="text-xl font-bold text-slate-700 mb-4">Aktenverlauf</h3><ul className="space-y-3">{(editedRecord.history || []).map((event, index) => (<li key={index} className="text-sm text-slate-600 flex items-center"><Icon path={ICONS.history} className="w-4 h-4 mr-3 text-slate-400"/><span className="font-semibold">{event.user}</span>&nbsp;{event.action} - <span className="text-slate-500 ml-1">{formatDate(event.timestamp)}</span></li>))}</ul></div>)}
        <div className="mt-8 text-right"><button onClick={saveRecord} className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-bold text-base shadow-sm">Alle Änderungen speichern</button></div>
    </div>
    )
};
const UserManagementView = ({ currentUser, users, addUser, requestDeleteUser, setPopupConfig, handleUserUpdate }) => {
    const [newUsername, setNewUsername] = useState('');
    const generatePassword = () => Math.random().toString(36).slice(-8);
    const handleAddUser = (e) => { e.preventDefault(); if (!newUsername.trim()) return; const password = generatePassword(); const newUser = addUser(newUsername, password, 'Officer', 1); if (newUser) { setPopupConfig({ title: 'Neuer Benutzer erstellt', message: `Benutzername: ${newUser.username}\nPasswort: ${newUser.password}` }); setNewUsername(''); } else { alert('Benutzername existiert bereits!'); } };
    return (
        <div className="p-6 md:p-8"><h2 className="text-3xl font-bold text-slate-800 mb-6">Benutzerverwaltung</h2><div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div><h3 className="text-xl font-bold text-slate-700 mb-4">Neuen Benutzer anlegen</h3><form onSubmit={handleAddUser} className="bg-slate-50/70 p-6 rounded-lg border border-slate-200"><label className="block font-semibold text-slate-600 mb-2">Benutzername</label><input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg" required/><button type="submit" className="mt-4 w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition-all duration-300 flex items-center justify-center space-x-2"><Icon path={ICONS.plus} className="w-5 h-5"/><span>Benutzer erstellen</span></button></form></div>
            <div><h3 className="text-xl font-bold text-slate-700 mb-4">Existierende Benutzer</h3><div className="bg-white rounded-lg shadow-md"><ul className="divide-y divide-slate-200">
                {users.map(user => (<li key={user.id} className="p-4 grid grid-cols-3 gap-4 items-center">
                    <div><span className="font-semibold text-slate-800">{user.username}</span><span className="text-xs text-slate-600 ml-2 bg-slate-200 px-2 py-0.5 rounded-full font-semibold">{user.role}</span></div>
                    <div className="flex items-center"><select value={user.securityLevel} onChange={(e) => handleUserUpdate(user.id, 'securityLevel', parseInt(e.target.value, 10))} disabled={currentUser.role !== 'Admin'} className="p-2 border border-slate-300 rounded-lg bg-white disabled:bg-slate-100 disabled:cursor-not-allowed w-full"><option value={1}>Stufe 1</option><option value={2}>Stufe 2</option><option value={3}>Stufe 3</option><option value={4}>Stufe 4</option><option value={5}>Stufe 5</option></select></div>
                    <div className="text-right">{currentUser.id !== user.id && currentUser.role === 'Admin' && (<button onClick={() => requestDeleteUser(user.id)} className="text-slate-400 hover:text-red-600 p-2 rounded-full hover:bg-red-100 transition-all"><Icon path={ICONS.trash} className="w-5 h-5"/></button>)}</div>
                </li>))}
            </ul></div></div>
        </div></div>
    );
};
const DashboardView = ({ records, openRecord, getSecurityLevelClass, currentUser }) => {
    const stats = { total: records.length, level1: records.filter(r => r.securityLevel === 'Stufe 1').length, level2: records.filter(r => r.securityLevel === 'Stufe 2').length, level3: records.filter(r => r.securityLevel === 'Stufe 3').length, level4: records.filter(r => r.securityLevel === 'Stufe 4').length, level5: records.filter(r => r.securityLevel === 'Stufe 5').length };
    const recentRecords = [...records].sort((a,b) => new Date(b.lastModified) - new Date(a.lastModified)).slice(0, 5);
    return (
        <div className="p-6 md:p-8"><h2 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-8">
                <div className="bg-slate-700 text-white p-5 rounded-xl shadow-lg text-center"><div className="text-4xl font-bold">{stats.total}</div><div className="mt-1 text-slate-300">Gesamt</div></div>
                <div className={`p-5 rounded-xl shadow-lg text-center ${getSecurityLevelClass('Stufe 1')} `}><div className="text-4xl font-bold">{stats.level1}</div><div className="mt-1 font-semibold">Stufe 1</div></div>
                <div className={`p-5 rounded-xl shadow-lg text-center ${getSecurityLevelClass('Stufe 2')} `}><div className="text-4xl font-bold">{stats.level2}</div><div className="mt-1 font-semibold">Stufe 2</div></div>
                <div className={`p-5 rounded-xl shadow-lg text-center ${getSecurityLevelClass('Stufe 3')} `}><div className="text-4xl font-bold">{stats.level3}</div><div className="mt-1 font-semibold">Stufe 3</div></div>
                <div className={`p-5 rounded-xl shadow-lg text-center ${getSecurityLevelClass('Stufe 4')} `}><div className="text-4xl font-bold">{stats.level4}</div><div className="mt-1 font-semibold">Stufe 4</div></div>
                <div className={`p-5 rounded-xl shadow-lg text-center ${getSecurityLevelClass('Stufe 5')} `}><div className="text-4xl font-bold">{stats.level5}</div><div className="mt-1 font-semibold">Stufe 5</div></div>
            </div>
            <div><h3 className="text-xl font-bold text-slate-700 mb-4">Zuletzt bearbeitete Akten</h3><div className="bg-white rounded-lg shadow-md"><ul className="divide-y divide-slate-200">
                {recentRecords.filter(r => currentUser.securityLevel >= SECURITY_LEVEL_MAP[r.securityLevel]).map(record => (
                    <li key={record.id} onClick={() => openRecord(record)} className="p-4 hover:bg-slate-100 cursor-pointer flex justify-between items-center transition-all">
                        <div><span className="font-semibold text-slate-800">{record.name}</span><span className="text-sm text-slate-500 block font-mono">DOJ-{String(record.id).padStart(5, '0')}</span></div>
                        <span className={`px-3 py-1 text-sm font-bold rounded-full shadow-sm ${getSecurityLevelClass(record.securityLevel)}`}>{record.securityLevel}</span>
                    </li>
                ))}
                {recentRecords.length === 0 && <p className="text-center text-slate-500 p-8">Keine Akten vorhanden.</p>}
            </ul></div></div>
        </div>
    );
};

// --- Kernkomponenten ---
const DOJNet = ({ currentUser, users, setUsers, onLogout, records, setRecords }) => {
    const [view, setView] = useState('dashboard'); const [popupConfig, setPopupConfig] = useState(null); const [recordToDelete, setRecordToDelete] = useState(null); const [userToDelete, setUserToDelete] = useState(null); const [newRecord, setNewRecord] = useState({ name: '', securityLevel: 'Stufe 1', birthdate: '', address: '', phone: '' }); const [showForm, setShowForm] = useState(false); const [searchTerm, setSearchTerm] = useState(''); const [selectedRecord, setSelectedRecord] = useState(null); const [editedRecord, setEditedRecord] = useState(null);
    const openRecord = (record) => { const userLevel = currentUser.securityLevel; const recordLevel = SECURITY_LEVEL_MAP[record.securityLevel]; if (userLevel >= recordLevel) { setSelectedRecord(record); setEditedRecord({ ...record, entries: [...record.entries], history: [...(record.history || [])]}); setView('recordDetail'); } else { console.log("Access Denied: Insufficient security level."); } };
    const closeRecord = () => { setSelectedRecord(null); setEditedRecord(null); setView('records'); };
    const saveRecord = () => { if (!editedRecord) return; const now = new Date().toISOString(); const finalRecord = {...editedRecord, lastModified: now, history: [...(editedRecord.history || []), { user: currentUser.username, action: 'Akte gespeichert', timestamp: now }]}; setRecords(records.map(r => r.id === editedRecord.id ? finalRecord : r)); closeRecord(); };
    const handleNewRecordChange = (e) => { const { name, value } = e.target; setNewRecord(prev => ({ ...prev, [name]: value })); };
    const addRecord = (e) => { e.preventDefault(); if (!newRecord.name.trim()) return; const now = new Date().toISOString(); const recordToAdd = { id: Date.now(), ...newRecord, entries: [], history: [{user: currentUser.username, action: "Akte erstellt", timestamp: now}], createdAt: now, lastModified: now }; setRecords([...records, recordToAdd]); setNewRecord({ name: '', securityLevel: 'Stufe 1', birthdate: '', address: '', phone: '' }); setShowForm(false); openRecord(recordToAdd); };
    const requestDeleteRecord = (recordId) => { setRecordToDelete(recordId); };
    const confirmDeleteRecord = () => { if (recordToDelete === null) return; setRecords(records.filter(r => r.id !== recordToDelete)); setRecordToDelete(null); };
    const addUser = (username, password, role, securityLevel) => { if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) return null; const newUser = { id: Date.now(), username, password, role, securityLevel }; setUsers([...users, newUser]); return newUser; };
    const handleUserUpdate = (userId, key, value) => { setUsers(users.map(u => (u.id === userId ? { ...u, [key]: value } : u))); };
    const requestDeleteUser = (userId) => { setUserToDelete(userId); };
    const confirmDeleteUser = () => { if (userToDelete === null || userToDelete === currentUser.id) return; setUsers(users.filter(u => u.id !== userToDelete)); setUserToDelete(null); };
    const filteredRecords = records.filter(record => record.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const getSecurityLevelClass = (level) => (SECURITY_LEVEL_CLASS_MAP[level] || 'bg-gray-200 text-gray-800');
    const formatDate = (dateString) => { if (!dateString) return 'N/A'; return new Date(dateString).toLocaleString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); };

    const renderView = () => {
        if (view === 'recordDetail' && selectedRecord) { return <RecordDetailView {...{ editedRecord, setEditedRecord, closeRecord, saveRecord, currentUser, formatDate, getSecurityLevelClass }}/>; }
        switch(view) {
            case 'dashboard': return <DashboardView {...{ records, openRecord, getSecurityLevelClass, currentUser }} />;
            case 'records': return <RecordsListView {...{ currentUser, searchTerm, setSearchTerm, showForm, setShowForm, addRecord, newRecord, handleNewRecordChange, filteredRecords, openRecord, getSecurityLevelClass, requestDeleteRecord }}/>;
            case 'users': return <UserManagementView {...{ currentUser, users, addUser, requestDeleteUser, setPopupConfig, handleUserUpdate }} />;
            default: return <DashboardView {...{ records, openRecord, getSecurityLevelClass, currentUser }} />;
        }
    };

    return (
        <div className="p-0 md:p-4 lg:p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen font-sans">
            {popupConfig && <Popup title={popupConfig.title} message={popupConfig.message} onClose={() => setPopupConfig(null)} />}
            {recordToDelete !== null && <ConfirmationModal title="Akte löschen?" message={`Möchten Sie die Akte DOJ-${String(recordToDelete).padStart(5, '0')} wirklich endgültig löschen?`} onConfirm={confirmDeleteRecord} onCancel={()=>setRecordToDelete(null)} />}
            {userToDelete !== null && <ConfirmationModal title="Benutzer löschen?" message={`Möchten Sie den Benutzer wirklich endgültig löschen? Diese Aktion kann nicht rückgängig gemacht werden.`} onConfirm={confirmDeleteUser} onCancel={() => setUserToDelete(null)} />}
            <div className="max-w-7xl mx-auto bg-slate-100 rounded-xl shadow-2xl shadow-black/20 min-h-[90vh] flex flex-col">
                <header className="bg-white text-slate-800 p-4 rounded-t-xl flex justify-between items-center border-b border-slate-200/80"><div className="flex items-center space-x-4"><div className="bg-slate-800 text-white p-2 rounded-lg"><Icon path={ICONS.folder} className="w-8 h-8"/></div><div><h1 className="text-xl font-bold">Department of Justice</h1><p className="text-sm text-slate-500">Intranet</p></div></div>
                    <nav className="flex items-center space-x-1 md:space-x-2">
                        <button onClick={() => setView('dashboard')} className={`px-2 md:px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all ${view === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-200'}`}><Icon path={ICONS.dashboard} className="w-5 h-5"/><span className="hidden md:inline">Dashboard</span></button>
                        <button onClick={() => setView('records')} className={`px-2 md:px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all ${view === 'records' || view === 'recordDetail' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-200'}`}><Icon path={ICONS.folder} className="w-5 h-5"/><span className="hidden md:inline">Akten</span></button>
                        {currentUser.role === 'Admin' && <button onClick={() => setView('users')} className={`px-2 md:px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all ${view === 'users' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-200'}`}><Icon path={ICONS.users} className="w-5 h-5"/><span className="hidden md:inline">Benutzer</span></button>}
                        <div className="border-l border-slate-200 h-8 mx-2"></div>
                        <div className="text-right hidden sm:block"><div className="font-semibold text-slate-800">{currentUser.username}</div><div className="text-xs text-slate-500">Stufe {currentUser.securityLevel} {currentUser.role}</div></div>
                        <button onClick={onLogout} className="bg-slate-100 text-slate-600 px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all ml-2"><Icon path={ICONS.logout} className="w-5 h-5"/></button>
                    </nav>
                </header>
                <main className="flex-grow bg-slate-50/50 rounded-b-xl">{renderView()}</main>
            </div>
        </div>
    );
};
const LoginScreen = ({ onLogin, error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); onLogin(username, password); };
    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-700 flex justify-center items-center h-screen font-sans p-4">
            <div className="w-full max-w-sm">
                <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl px-8 pt-8 pb-8 border border-white/20">
                    <div className="mb-8 text-center text-white"><div className="inline-block bg-white/20 p-4 rounded-full mb-4"><Icon path={ICONS.folder} className="w-10 h-10 text-white"/></div><h1 className="text-3xl font-bold">DOJ Intranet</h1><p className="text-slate-300">Bitte melden Sie sich an</p></div>
                    <div className="mb-4"><label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="username">Benutzername</label><div className="relative"><div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Icon path={ICONS.user} className="h-5 w-5 text-slate-400"/></div><input value={username} onChange={e => setUsername(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg w-full py-2 px-3 pl-10 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400" id="username" type="text" placeholder="Benutzername"/></div></div>
                    <div className="mb-6"><label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="password">Passwort</label><div className="relative"><div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Icon path={ICONS.lock} className="h-5 w-5 text-slate-400"/></div><input value={password} onChange={e => setPassword(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg w-full py-2 px-3 pl-10 text-white mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400" id="password" type="password" placeholder="******************"/></div></div>
                    {error && <p className="text-red-400 text-xs italic mb-4 text-center">{error}</p>}
                    <div className="flex items-center justify-between"><button className="bg-gradient-to-r from-blue-500 to-blue-600 w-full text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300" type="submit">Anmelden</button></div>
                </form>
            </div>
        </div>
    );
};

const App = () => {
    const [users, setUsers] = useState([{ id: 1, username: 'Moritz', password: '123', role: 'Admin', securityLevel: 5 }]);
    const [records, setRecords] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loginError, setLoginError] = useState('');

    const handleLogin = (username, password) => {
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
        if (user) { setCurrentUser(user); setLoginError(''); }
        else { setLoginError('Ungültiger Benutzername oder Passwort.'); }
    };
    const handleLogout = () => { setCurrentUser(null); };

    return (
        <div className='app' data-theme='dark'>
            <div className='app-wrapper' style={{ height: '100vh', width: '100%', overflowY: 'auto' }}>
                {currentUser ? (
                    <DOJNet currentUser={currentUser} users={users} setUsers={setUsers} onLogout={handleLogout} records={records} setRecords={setRecords} />
                ) : (
                    <LoginScreen onLogin={handleLogin} error={loginError} />
                )}
            </div>
        </div>
    );
};

export default App;

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
body { margin: 0; font-family: 'Inter', sans-serif; }
@keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
.animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; filter: invert(0.5); }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);