import React from 'react';
import TextInput from '../common/TextInput';

const UserForm = ({user, onSave,onDelete, onClear,onChange, saving,deleting, errors}) => {

  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        value={user.name}
        onChange={onChange}
        error={errors.name}
      />
      <TextInput
        name="role"
        label="Role"
        value={user.role}
        onChange={onChange}
        error={errors.role}
      />
      <input
        type="button"  
        disabled={deleting}
        value={deleting ? 'Deleting...' : 'Delete'}
        className="btn btn-primary"
        onClick={onDelete}
      /> &nbsp;
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Submitting...' : 'Submit'}
        className="btn btn-primary"
        onClick={onSave}
      /> &nbsp;
      <input
        type="button"
        value={'Clear'}
        className="btn btn-primary"
        onClick={onClear}
      />
    </form>
  );
};

UserForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onClear: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,  
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  deleting: React.PropTypes.bool,  
  errors: React.PropTypes.object
};

export default UserForm;
