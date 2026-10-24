import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { CustomCheckbox } from '@/components/CustomCheckbox';
import { UserProfile, DEFAULT_USER_PROFILE } from '@/types/profile';
import {
  getUserProfile,
  saveUserProfile,
  clearUserProfile,
  formatPhoneNumber,
  isValidEmail,
} from '@/services/storage';
import { LittleLemonColors } from '@/constants/theme';

export default function ProfileScreen() {
  const router = useRouter();

  const [savedProfile, setSavedProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderStatuses, setOrderStatuses] = useState(true);
  const [passwordChanges, setPasswordChanges] = useState(true);
  const [specialOffers, setSpecialOffers] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      const user = await getUserProfile();
      setSavedProfile(user);
      populateForm(user);
    }
    loadData();
  }, []);

  const populateForm = (user: UserProfile) => {
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setEmail(user.email || '');
    setPhoneNumber(user.phoneNumber || '');
    setOrderStatuses(user.orderStatuses);
    setPasswordChanges(user.passwordChanges);
    setSpecialOffers(user.specialOffers);
    setNewsletter(user.newsletter);
    setAvatarUri(user.avatarUri);
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const handleSaveChanges = async () => {
    if (!firstName.trim()) {
      Alert.alert('Validation Error', 'First name cannot be empty.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    try {
      setSaving(true);
      const updated = await saveUserProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        orderStatuses,
        passwordChanges,
        specialOffers,
        newsletter,
        avatarUri,
      });
      setSavedProfile(updated);
      Alert.alert('Success', 'Your profile changes have been saved!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    populateForm(savedProfile);
    Alert.alert('Discarded', 'Reverted unsaved changes to your last saved profile.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out from Little Lemon?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await clearUserProfile();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  const handleChangeAvatar = () => {
    Alert.alert(
      'Change Avatar',
      'Select a preset avatar or use photo library:',
      [
        {
          text: 'Tilly Doe (Preset)',
          onPress: () => setAvatarUri(null),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleRemoveAvatar = () => {
    setAvatarUri(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Back Button */}
        <Header
          showBack={true}
          onBackPress={() => router.back()}
          showProfile={true}
          avatarUri={avatarUri}
        />

        {/* Profile Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal information</Text>

          {/* Avatar Section */}
          <Text style={styles.fieldLabel}>Avatar</Text>
          <View style={styles.avatarRow}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarLarge} />
            ) : (
              <Image
                source={require('@/assets/images/Profile.png')}
                style={styles.avatarLarge}
              />
            )}

            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleChangeAvatar}
              activeOpacity={0.8}
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemoveAvatar}
              activeOpacity={0.8}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>

          {/* First Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First name"
              placeholderTextColor={LittleLemonColors.textMuted}
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last name"
              placeholderTextColor={LittleLemonColors.textMuted}
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email address"
              placeholderTextColor={LittleLemonColors.textMuted}
            />
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              placeholder="(217) 555-0113"
              placeholderTextColor={LittleLemonColors.textMuted}
              maxLength={14}
            />
          </View>

          {/* Email Notifications */}
          <Text style={styles.sectionHeader}>Email notifications</Text>
          <CustomCheckbox
            label="Order statuses"
            checked={orderStatuses}
            onChange={setOrderStatuses}
          />
          <CustomCheckbox
            label="Password changes"
            checked={passwordChanges}
            onChange={setPasswordChanges}
          />
          <CustomCheckbox
            label="Special offers"
            checked={specialOffers}
            onChange={setSpecialOffers}
          />
          <CustomCheckbox
            label="Newsletter"
            checked={newsletter}
            onChange={setNewsletter}
          />

          {/* Log Out Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>

          {/* Discard & Save Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.discardButton}
              onPress={handleDiscardChanges}
              activeOpacity={0.7}
            >
              <Text style={styles.discardButtonText}>Discard changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveChanges}
              disabled={saving}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>
                {saving ? 'Saving...' : 'Save changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: LittleLemonColors.background,
  },
  scrollContent: {
    paddingBottom: 48,
    backgroundColor: LittleLemonColors.background,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: LittleLemonColors.border,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: LittleLemonColors.textPrimary,
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: LittleLemonColors.textMuted,
    marginBottom: 10,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarLarge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    marginRight: 16,
  },
  changeButton: {
    backgroundColor: LittleLemonColors.primaryGreen,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 12,
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  removeButton: {
    borderWidth: 1,
    borderColor: LittleLemonColors.primaryGreen,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  removeButtonText: {
    color: LittleLemonColors.primaryGreen,
    fontWeight: '600',
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: LittleLemonColors.textMuted,
    marginBottom: 6,
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: LittleLemonColors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
    color: LittleLemonColors.textPrimary,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: LittleLemonColors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: LittleLemonColors.buttonYellow,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  discardButton: {
    flex: 1,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: LittleLemonColors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  discardButtonText: {
    color: LittleLemonColors.textMuted,
    fontWeight: '600',
    fontSize: 14,
  },
  saveButton: {
    flex: 1,
    height: 46,
    borderRadius: 8,
    backgroundColor: LittleLemonColors.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
