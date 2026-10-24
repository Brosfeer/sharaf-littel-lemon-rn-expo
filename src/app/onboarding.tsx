import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { completeOnboarding, isValidEmail } from '@/services/storage';
import { LittleLemonColors } from '@/constants/theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Validation
  const isNameValid = firstName.trim().length >= 2;
  const isEmailValid = isValidEmail(email);
  const isFormValid = isNameValid && isEmailValid;

  const handleNext = async () => {
    if (!isFormValid || submitting) return;

    try {
      setSubmitting(true);
      await completeOnboarding(firstName, email);
      router.replace('/');
    } catch (error) {
      console.error('Error during onboarding:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
        {/* Header with Centered Logo only */}
        <Header showBack={false} showProfile={false} />

        {/* Hero Banner */}
        <HeroSection
          searchQuery=""
          onSearchChange={() => {}}
          showSearch={false}
        />

        {/* Onboarding Form */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Let us get to know you</Text>

          {/* First Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              First Name <Text style={styles.asterisk}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Tilly"
              placeholderTextColor={LittleLemonColors.textMuted}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              autoCorrect={false}
              accessibilityLabel="First Name"
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Email <Text style={styles.asterisk}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. tillydoe@example.com"
              placeholderTextColor={LittleLemonColors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              accessibilityLabel="Email Address"
            />
          </View>

          {/* Submit Action */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              !isFormValid && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!isFormValid || submitting}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={{ disabled: !isFormValid }}
          >
            <Text
              style={[
                styles.nextButtonText,
                !isFormValid && styles.nextButtonTextDisabled,
              ]}
            >
              {submitting ? 'Setting up...' : 'Next'}
            </Text>
          </TouchableOpacity>
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
    flexGrow: 1,
    backgroundColor: LittleLemonColors.background,
    paddingBottom: 40,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: LittleLemonColors.highlightDark,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: LittleLemonColors.textMuted,
    marginBottom: 8,
  },
  asterisk: {
    color: LittleLemonColors.primaryGreen,
    fontWeight: '700',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: LittleLemonColors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: LittleLemonColors.textPrimary,
    backgroundColor: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: LittleLemonColors.primaryGreen,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  nextButtonDisabled: {
    backgroundColor: LittleLemonColors.highlightLight,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  nextButtonTextDisabled: {
    color: LittleLemonColors.textMuted,
  },
});
