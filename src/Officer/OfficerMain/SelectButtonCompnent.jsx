import { useState } from 'react';

export default function SelectButtonComponent({ data, onSelect,dataName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Sample data if none provided


  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
    onSelect?.(item.id);
  };
    //d#667eea
  const styles = `
  :root {
    --primary-color: #fd7e14;
  }
   .SelectButtoncontainer {
      width: 100%;
      max-width: 400px;
      margin: 10px auto;
    }

   .SelectButtonlabel {
      display: block;
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 600;
      color: white;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

   .SelectButtondropdown-wrapper {
      position: relative;
      font-size:16px;
    }

   .SelectButtondropdown-header {
      background: white;
      border: 2px solid #e0e0e0;
      padding:.5em 1.25em;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      color: #333;
      transition: all 0.3s ease;
      user-select: none;
      width: 100%;
    }

   .SelectButtondropdown-header:hover {
      border-color: var(--primary-color);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    }

   .SelectButtondropdown-header.active {
      border-color: var(--primary-color);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    }

   .SelectButtondropdown-icon {
      transition: transform 0.3s ease;
      color: var(--primary-color);
    }

   .SelectButtondropdown-icon.active {
      transform: rotate(180deg);
    }

   .SelectButtondropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;

      border-top: none;
      border-radius: 0 0 12px 12px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
      z-index: 1000;
    }

    .SelectButtondropdown-menu.active {
      max-height: 360px;
      overflow-y: auto;
      border: 2px solid var(--primary-color);
    }

    .SelectButtondropdown-item {
      padding: .5em 1.25em;
      color: #555;
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
      font-size: 15px;
    }

    .SelectButtondropdown-item:hover {
      background: #f5f7ff;
      color: var(--primary-color);
      border-left-color: var(--primary-color);
      padding-left: 24px;
    }

    .SelectButtondropdown-item.selected {
      background: #f5f7ff;
      color: var(--primary-color);
      font-weight: 600;
      border-left-color: var(--primary-color);
      padding-left: 24px;
    }


  `;

  return (
    <>
      <style>{styles}</style>
      <div className="SelectButtoncontainer">
        <div className="SelectButtondropdown-wrapper">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`SelectButtondropdown-header ${isOpen ? 'active' : ''}`}
          >
            <span>{selected?.name || dataName}</span>
            <div className={`SelectButtondropdown-icon ${isOpen ? 'active' : ''}`}>▼</div>
          </div>

          <div className={`SelectButtondropdown-menu ${isOpen ? 'active' : ''}`}>
            {data
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`SelectButtondropdown-item ${selected?.id === item.id ? 'selected' : ''}`}
                >
                  {item.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}